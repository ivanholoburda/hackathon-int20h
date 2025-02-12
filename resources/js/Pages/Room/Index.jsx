import React, {useEffect, useState} from "react";
import Pusher from "pusher-js";
import axios from "axios";
import {Alert, Button, Snackbar} from "@mui/material";
import QuestionForm from "@/Components/QuestionForm/QuestionForm.jsx";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import ChatBox from "@/Components/ChatBox/ChatBox.jsx";
import DraggableWrapper from "@/Components/DraggableWrapper.jsx";

export default function Index({room, user}) {
    const cells = [{id: "start", title: "Старт"}, ...room.quest.questions, {id: "finish", title: "Фініш"}];

    const [users, setUsers] = useState(room.users);
    const [messages, setMessages] = useState(room.messages);
    const [newUser, setNewUser] = useState(null);
    const [gameStatus, setGameStatus] = useState(room.status);
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [isDiceBlocked, setIsDiceBlocked] = useState(false);
    const [timer, setTimer] = useState(0);
    const [gameResult, setGameResult] = useState(null);
    const [feedback, setFeedback] = useState({open: false, success: false, message: ""});
    const [loading, setLoading] = useState(false);
    const [hideQuestion, setHideQuestion] = useState(false);

    useEffect(() => {
        const pusher = new Pusher('53bd861197f35b2ad990', {
            cluster: 'eu',
        });

        const channel = pusher.subscribe(`room-${room.id}`);

        channel.bind("UserJoinedRoomEvent", (data) => {
            setUsers((prevUsers) => [...prevUsers, { user: data.user, current_question_id: room.quest.questions[0].id }]);
            setNewUser(data.user.name);
        });

        channel.bind("UserMovedToQuestionEvent", (data) => {
            setUsers((prevUsers) => {
                const updatedUsers = prevUsers.map((element) =>
                    element.user.id === data.user.id
                        ? {...element, current_question_id: data.question_id}
                        : element
                );
                return updatedUsers;
            });

            if (data.user.id === user.id) {
                if (data.question_id !== "start") {
                    fetchQuestion(data.question_id);
                }
            }
        });

        channel.bind("GameStartedEvent", () => {
            setGameStatus("IN_PROGRESS");
        });

        channel.bind("GameCompletedEvent", (data) => {
            setHideQuestion(true);
            setCurrentQuestion(null);
            setLoading(false);
            setGameResult(data.winner_id === user.id ? "win" : "lose");
        });

        channel.bind('ChatMessageCreatedEvent', (data) => {
            setMessages(prevMessages => [...prevMessages, data]);
        });

        return () => {
            channel.unbind_all();
            channel.unsubscribe();
        };
    }, [room.id]);

    useEffect(() => {
        if (timer > 0) {
            const interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);

            return () => clearInterval(interval);
        } else {
            setIsDiceBlocked(false);
            setLoading(false);
        }
    }, [timer]);

    useEffect(() => {
        if (gameResult) {
            console.log(gameResult)
            setCurrentQuestion(null);
            const timer = setTimeout(() => {
                window.location.href = "/profile";
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [gameResult]);

    const fetchQuestion = (questionId) => {
        setLoading(true);
        axios.get(`/quests/${room.quest.id}/questions/${questionId}`)
            .then(response => {
                console.log(gameResult)
                if (gameResult === null) setCurrentQuestion(response.data.question);
                setLoading(false);
            })
            .catch(error => {
                setLoading(false);
            });
    };

    const checkAnswer = async (answer) => {
        return await axios.post(`/quests/${room.quest.id}/questions/${currentQuestion.id}/check`, {
            ...answer,
            room_id: room.id
        })
            .then(response => {
                return response.data.correctness;
            })
            .catch(error => {
                console.error("Error checking answer:", error);
            });
    };

    const rollDice = async () => {
        if (isDiceBlocked || loading) return;

        const currentUser = users.find(element => element.user.id === user.id);
        if (currentUser) {
            const currentCellIndex = cells.findIndex(cell => cell.id === currentUser.current_question_id);
            const newIndex = Math.min(currentCellIndex + 1, cells.length - 1);
            const newCell = cells[newIndex];

            if (newCell.id !== "start") {
                setLoading(true);
                axios.post(`/rooms/${room.id}/roll-dice`, {question_id: newCell.id !== 'finish' ? newCell.id : cells[newIndex - 1].id})
                    .then(async (response) => {
                        console.log(newCell.id);
                        setUsers(prevUsers => {
                                return prevUsers.map(u => {
                                        return u.user.id === user.id
                                            ? {current_question_id: newCell.id, ...u}
                                            : u
                                    }
                                )
                            }
                        );
                        console.log("Response:", response.data);
                    }).then(() => {
                    if (newCell.id !== 'finish') fetchQuestion(newCell.id);
                })
                    .catch(error => {
                        console.error("Error rolling dice:", error);
                    });
            }
        }
    };

    const surrender = () => {
        setLoading(true);
        setIsDiceBlocked(true);
        setTimer(10);
        setCurrentQuestion(null)
    }

    const onFormClose = () => {
        setCurrentQuestion(null);
    }

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold mb-4 text-center">Кімната #{room.id}</h1>

            <div style={{position: "relative"}}>
                {cells.map((cell, index) => {
                    const angleStep = 360 / cells.length;
                    const angle = angleStep * index;

                    const radius = 200 + Math.floor(cells.length / 4) * 20;
                    const x = radius + radius * Math.cos((angle * Math.PI) / 180);
                    const y = 40 + radius + radius * Math.sin((angle * Math.PI) / 180);

                    const usersOnCell = users.filter(u => u.current_question_id === cell.id);

                    return (
                        <div
                            key={index}
                            className="absolute text-center flex items-center justify-center w-20 h-20 bg-blue-500 text-white rounded-lg shadow-md cursor-pointer"
                            style={{top: `${y}px`, left: `${x}px`, transform: "translate(-50%, -50%)"}}
                        >
                            {cell.id === "start" ? "Старт" : cell.id === "finish" ? "Фініш" : index}

                            {usersOnCell.length > 0 && (
                                <div
                                    className="absolute bottom-0 left-0 flex flex-wrap w-full justify-center space-x-[-5px] space-y-[-5px]">
                                    {usersOnCell.map((u, userIndex) => (
                                        <div
                                            key={userIndex}
                                            className="w-6 h-6 bg-red-500 text-xs text-white flex items-center justify-center rounded-full shadow-md"
                                            style={{zIndex: userIndex, transform: `translateY(${userIndex * 5}px)`}}
                                        >
                                            {u.user.name[0]}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            <DraggableWrapper>
                <ChatBox messages={messages} roomId={room.id}/>
            </DraggableWrapper>


            {gameStatus === "IN_PROGRESS" ? (
                <Button size="large" variant="contained" startIcon={<PlayArrowIcon/>}
                        sx={{
                            backgroundColor: "#66bb6a",
                            borderRadius: "30px",
                            mt: `${220 + Math.floor(cells.length / 4) * 20}px`,
                            ml: `${140 + Math.floor(cells.length / 4) * 20}px`
                        }} onClick={() => fetchQuestion(users.find((u) => u.user.id === user.id).current_question_id)}
                        disabled={loading}>
                    {isDiceBlocked ? `Зачекайте ${timer} сек` : "Вперед"}
                </Button>
            ) : (
                <p className="mt-4 text-gray-500">Очікування початку гри...</p>
            )}

            <QuestionForm currentQuestion={currentQuestion} checkAnswer={checkAnswer} surrender={surrender}
                          onClose={onFormClose} setFeedback={setFeedback} rollDice={rollDice}
                          hideQuestion={hideQuestion}/>

            {newUser && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                        <h2 className="text-lg font-bold">Новий гравець приєднався!</h2>
                        <p className="text-xl">{newUser}</p>
                        <button
                            onClick={() => setNewUser(null)}
                            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600"
                        >
                            OK
                        </button>
                    </div>
                </div>
            )}

            {gameResult && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                        <h2 className="text-lg font-bold">
                            {gameResult === "win"
                                ? "Ви виграли! 🎉😳 Ви будете перенаправлені на сторінку профілю для перегляду місця через 5 секунд"
                                : "Ви програли! Ви будете перенаправлені на сторінку профілю для перегляду місця через 5 секунд"}
                        </h2>
                        <button
                            onClick={() => window.location.href = "/profile"}
                            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600"
                        >
                            Перейти до профілю
                        </button>
                    </div>
                </div>
            )}

            <Snackbar open={feedback.open} autoHideDuration={2000}
                      onClose={() => setFeedback({...feedback, open: false})}>
                <Alert severity={feedback.success ? "success" : "error"}
                       onClose={() => setFeedback({...feedback, open: false})}>
                    {feedback.message}
                </Alert>
            </Snackbar>
        </div>
    );
}
