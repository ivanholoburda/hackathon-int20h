import React, { useState } from "react";
import { router, useForm as useInertiaForm } from "@inertiajs/react";
import {
    Box,
    TextField,
    Button,
    Typography,
    Paper,
    Grid,
    Card,
    CardContent,
    CardActions,
    Avatar,
    IconButton,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddQuestionDialog from "../../Components/AddQuestionDialog/AddQuestionDialog.jsx";

function EditQuestForm({ quest, question_types }) {
    const { data, setData, post, delete: destroy } = useInertiaForm({
        name: quest.name,
        description: quest.description,
        cover: null,
    });

    const [preview, setPreview] = useState(quest.cover);
    const [openAddQuestion, setOpenAddQuestion] = useState(false);
    const [editingQuestion, setEditingQuestion] = useState(null);

    const handleCoverChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData("cover", file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSaveQuest = () => {
        post(`/quests/${quest.id}?_method=PUT`, { preserveScroll: true });
    };

    const handleAddQuestion = (question) => {
        router.post(`/quests/${quest.id}/questions`, question, {
            preserveScroll: true,
            onSuccess: () => setOpenAddQuestion(false),
        });
    };

    const handleUpdateQuestion = (question) => {
        router.post(`/quests/${quest.id}/questions/${editingQuestion.id}`, {
            ...question,
            _method: "PATCH",
        }, {
            preserveScroll: true,
            onSuccess: () => setOpenAddQuestion(false),
        });
    };

    const handleDeleteQuestion = (questionId) => {
        destroy(`/quests/${quest.id}/questions/${questionId}`, { preserveScroll: true });
    };

    return (
        <Paper
            sx={{
                padding: "30px",
                maxWidth: "600px",
                margin: "auto",
                boxShadow: 3,
                backgroundColor: "#ffffff",
                borderRadius: "10px",
            }}
        >
            <Box display="flex" alignItems="center" mb={2}>
                <IconButton onClick={() => window.history.back()} sx={{ color: "#66bb6a" }}>
                    <ArrowBackIcon />
                </IconButton>
                <Typography variant="h5" sx={{ fontWeight: "bold", color: "#388e3c", flex: 1, textAlign: "center" }}>
                    Редагування квесту
                </Typography>
            </Box>

            <Box
                component="form"
                onSubmit={(e) => {
                    e.preventDefault();
                    handleSaveQuest();
                }}
                sx={{ display: "flex", flexDirection: "column", gap: 2 }}
            >
                <TextField
                    label="Назва"
                    required
                    value={data.name}
                    onChange={(e) => setData("name", e.target.value)}
                    fullWidth
                    sx={{
                        "& .MuiInputLabel-root": { color: "#66bb6a" },
                        "& .MuiOutlinedInput-root": { "& fieldset": { borderColor: "#81c784" } },
                    }}
                />
                <TextField
                    label="Опис"
                    required
                    value={data.description}
                    onChange={(e) => setData("description", e.target.value)}
                    fullWidth
                    multiline
                    rows={3}
                    sx={{
                        "& .MuiInputLabel-root": { color: "#66bb6a" },
                        "& .MuiOutlinedInput-root": { "& fieldset": { borderColor: "#81c784" } },
                    }}
                />

                <Box>
                    <input type="file" accept="image/*" id="quest-cover" style={{ display: "none" }}
                           onChange={handleCoverChange} />
                    <label htmlFor="quest-cover">
                        <Avatar variant="square"
                                sx={{ width: "100%", height: 200, cursor: "pointer", borderRadius: "5px" }} src={preview}>
                            <UploadFileIcon sx={{ fontSize: 50 }} />
                        </Avatar>
                    </label>
                </Box>

                <Typography variant="h6" sx={{ mt: 2, color: "#388e3c" }}>
                    Питання:
                </Typography>
                <Grid container spacing={2}>
                    {quest.questions?.map((question) => (
                        <Grid item xs={12} key={question.id}>
                            <Card sx={{
                                display: "flex",
                                alignItems: "center",
                                padding: "10px",
                                borderRadius: "10px",
                                boxShadow: 2
                            }}>
                                <CardContent sx={{ flex: 1 }}>
                                    <Typography variant="subtitle1">{question.title}</Typography>
                                </CardContent>
                                <CardActions>
                                    <IconButton
                                        color="primary"
                                        onClick={() => {
                                            setEditingQuestion(question);
                                            setOpenAddQuestion(true);
                                        }}
                                    >
                                        <EditIcon sx={{ color: "#66bb6a" }} />
                                    </IconButton>
                                    <IconButton color="error" onClick={() => handleDeleteQuestion(question.id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>

                <Button
                    startIcon={<AddCircleIcon />}
                    fullWidth
                    variant="outlined"
                    sx={{ mt: 2, borderColor: "#66bb6a", color: "#66bb6a", borderRadius: "30px" }}
                    onClick={() => {
                        setEditingQuestion(null);
                        setOpenAddQuestion(true);
                    }}
                >
                    Додати питання
                </Button>

                <Button type="submit" variant="contained"
                        sx={{ mt: 2, backgroundColor: "#66bb6a", borderRadius: "30px" }}>
                    Зберегти квест
                </Button>
            </Box>

            <AddQuestionDialog
                open={openAddQuestion}
                onClose={() => setOpenAddQuestion(false)}
                onAdd={editingQuestion ? handleUpdateQuestion : handleAddQuestion}
                questionTypes={question_types}
                initialData={editingQuestion}
            />
        </Paper>
    );
}

export default EditQuestForm;
