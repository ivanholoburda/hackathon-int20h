import React, {useState, useEffect} from "react";
import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    Button, TextField, Radio, RadioGroup, FormControlLabel,
    FormLabel
} from "@mui/material";

export default function QuestionForm({currentQuestion, checkAnswer, surrender, onClose, setFeedback, rollDice, hideQuestion}) {
    const [userAnswer, setUserAnswer] = useState("");
    const [selectedOption, setSelectedOption] = useState(null);
    const [clickCoordinates, setClickCoordinates] = useState(null);
    const [loading, setLoading] = useState(false);
    const [timeLeft, setTimeLeft] = useState(10);

    useEffect(() => {
        if (!currentQuestion) return;

        setTimeLeft(currentQuestion.seconds_left);
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev === 1) {
                    clearInterval(timer);
                    surrender();
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [currentQuestion, onClose]);

    const handleImageClick = (event) => {
        const imgRect = event.target.getBoundingClientRect();
        const x = event.clientX - imgRect.left;
        const y = event.clientY - imgRect.top;
        setClickCoordinates([x, y]);
    };

    const handleSubmit = async () => {
        setLoading(true);

        let answerPayload;
        if (currentQuestion.type === "single_answer") {
            answerPayload = {single_answer: userAnswer};
        } else if (currentQuestion.type === "questions") {
            answerPayload = {question: currentQuestion.questions.find(q => q.text === selectedOption).correct};
        } else {
            answerPayload = {coordinates: clickCoordinates};
        }

        try {
            const result = await checkAnswer(answerPayload);
            setFeedback({
                open: true,
                success: result,
                message: result ? "Правильна відповідь!" : "Неправильна відповідь, очікуйте!"
            });
            setUserAnswer("");
            setSelectedOption(null);
            setClickCoordinates(null);
            if (!result) {
                surrender();
                return;
            }
            await rollDice();
            onClose();

        } finally {
            setLoading(false);
        }
    };

    if (!currentQuestion) return null;

    return (
        <Dialog open={!!currentQuestion && !hideQuestion} maxWidth="sm" fullWidth>
            <DialogTitle>{currentQuestion.title} ({timeLeft} сек)</DialogTitle>
            <DialogContent>
                <p>{currentQuestion.description}</p>
                {currentQuestion.image && currentQuestion.image !== `/storage/` && currentQuestion.type !== "image" && (
                    <img
                        src={currentQuestion.image}
                        alt="image"
                        style={{width: "100%"}}
                    />
                )}

                {currentQuestion.type === "single_answer" && (
                    <TextField
                        fullWidth
                        label="Введіть відповідь"
                        variant="outlined"
                        value={userAnswer}
                        onChange={(e) => setUserAnswer(e.target.value)}
                        margin="normal"
                        disabled={loading}
                        sx={{
                            "& .MuiInputLabel-root": {color: "#66bb6a"},
                            "& .MuiOutlinedInput-root": {"& fieldset": {borderColor: "#81c784"}},
                        }}
                    />
                )}

                {currentQuestion.type === "questions" && (
                    <RadioGroup
                        value={selectedOption}
                        onChange={(e) => setSelectedOption(e.target.value)}
                        style={{marginTop: 16}}
                    >
                        <FormLabel component="legend">Оберіть відповідь:</FormLabel>
                        {currentQuestion.questions.map((q, index) => (
                            <FormControlLabel
                                key={index}
                                value={q.text}
                                control={<Radio disabled={loading}/>}
                                label={q.text}
                            />
                        ))}
                    </RadioGroup>
                )}

                {currentQuestion.type === "image" && (
                    <div style={{marginTop: 16, position: "relative"}}>
                        <img
                            src={currentQuestion.image}
                            alt="Виберіть область"
                            style={{width: "100%", cursor: "pointer", opacity: loading ? 0.5 : 1}}
                            onClick={handleImageClick}
                        />
                        {clickCoordinates && (
                            <div
                                style={{
                                    position: "absolute",
                                    top: clickCoordinates[1],
                                    left: clickCoordinates[0],
                                    width: 10,
                                    height: 10,
                                    backgroundColor: "red",
                                    borderRadius: "50%",
                                    border: "2px solid black",
                                    transform: "translate(-50%, -50%)"
                                }}
                            />
                        )}
                    </div>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={surrender} color="secondary" disabled={loading}>Не знаю</Button>
                <Button onClick={handleSubmit} color="primary" variant="contained" disabled={loading}
                        sx={{backgroundColor: "#66bb6a"}}>
                    {loading ? "Перевірка..." : "Відповісти"}
                </Button>
            </DialogActions>
        </Dialog>
    );
}
