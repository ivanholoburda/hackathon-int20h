import React, {useState, useEffect, useRef} from "react";
import {
    Box,
    TextField,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    IconButton,
    Snackbar,
    Alert, RadioGroup, FormControlLabel, Radio,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";

function AddQuestionDialog({open, onClose, onAdd, questionTypes, initialData}) {
    const [questionData, setQuestionData] = useState({
        title: "",
        description: "",
        type: Object.keys(questionTypes)[0],
        questions: null,
        single_answer: "",
        coordinates: [],
        seconds_left: 10,
    });

    const imageRef = useRef(null);

    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    useEffect(() => {
        if (initialData) {
            setQuestionData(initialData);
        } else {
            setQuestionData({
                title: "",
                description: "",
                type: Object.keys(questionTypes)[0],
                questions: null,
                single_answer: "",
                coordinates: [],
                seconds_left: 10,
            });
        }
    }, [initialData]);

    const handleAddOption = () => {
        setQuestionData({
            ...questionData,
            questions: [...questionData.questions ?? [], {text: "", correct: false}],
        });
    };

    const handleOptionChange = (index, field, value) => {
        setQuestionData(prev => {
            const updatedQuestions = prev.questions?.map((q, i) =>
                i === index ? {...q, [field]: value} : {...q, correct: false}
            );
            return {...prev, questions: updatedQuestions || []};
        });
    };

    const handleDeleteOption = (index) => {
        setQuestionData({
            ...questionData,
            questions: questionData.questions?.filter((_, i) => i !== index) ?? [],
        });
    };

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setQuestionData((prev) => ({
                    ...prev,
                    image: e.target.result,
                    imageFile: file,
                    coordinates: [],
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleImageClick = (event) => {
        if (!imageRef.current) return;

        const rect = imageRef.current.getBoundingClientRect();
        const x = Math.round(event.clientX - rect.left);
        const y = Math.round(event.clientY - rect.top);

        setQuestionData(prev => {
            let newCoordinates = [...prev.coordinates ?? [], x, y];
            if (newCoordinates.length > 4) {
                newCoordinates = newCoordinates.slice(2);
            }
            return {...prev, coordinates: newCoordinates};
        });
    };

    const handleSave = () => {
        if (!questionData.title || !questionData.description ||
            (questionData.type === 'single_answer' && !questionData.single_answer)) {
            setSnackbarMessage("Будь ласка, заповніть усі обов'язкові поля.");
            setOpenSnackbar(true);
            return;
        }

        if (questionData.type === "questions") {
            if (!questionData.questions || questionData.questions.length === 0) {
                setSnackbarMessage("Додайте хоча б один варіант відповіді.");
                setOpenSnackbar(true);
                return;
            }

            const hasCorrectAnswer = questionData.questions.some(q => q.correct);
            if (!hasCorrectAnswer) {
                setSnackbarMessage("Оберіть правильний варіант відповіді.");
                setOpenSnackbar(true);
                return;
            }

            const hasEmptyOption = questionData.questions.some(q => !q.text.trim());
            if (hasEmptyOption) {
                setSnackbarMessage("Заповніть всі варіанти відповідей.");
                setOpenSnackbar(true);
                return;
            }
        }

        if (questionData.type === "image") {
            if (!questionData.image) {
                setSnackbarMessage("Завантажте зображення.");
                setOpenSnackbar(true);
                return;
            }
            if (questionData.coordinates.length < 4) {
                setSnackbarMessage("Виберіть дві точки на зображенні.");
                setOpenSnackbar(true);
                return;
            }
            if (questionData.coordinates[0] > questionData.coordinates[2] || questionData.coordinates[1] > questionData.coordinates[3]) {
                setSnackbarMessage("Виберіть ліву верхню та праву нижню кооридинати.");
                setOpenSnackbar(true);
                return;
            }

        }

        onAdd({...questionData, image: questionData.imageFile, imageFile: undefined});
        setQuestionData({
            title: "",
            description: "",
            type: Object.keys(questionTypes)[0],
            questions: null,
            single_answer: "",
            coordinates: [],
        });
        onClose();
    };

    return (
        <>
            <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
                <DialogTitle sx={{textAlign: "center", color: "#388e3c"}}>
                    {initialData ? "Редагувати питання" : "Додати питання"}
                </DialogTitle>
                <DialogContent>
                    <TextField
                        label="Назва питання"
                        required
                        fullWidth
                        margin="normal"
                        value={questionData.title}
                        onChange={(e) => setQuestionData({...questionData, title: e.target.value})}
                        sx={{
                            "& .MuiInputLabel-root": {color: "#66bb6a"},
                            "& .MuiOutlinedInput-root": {"& fieldset": {borderColor: "#81c784"}},
                            mb: 2,
                        }}
                    />
                    <TextField
                        label="Опис"
                        required
                        fullWidth
                        margin="normal"
                        multiline
                        rows={3}
                        value={questionData.description}
                        onChange={(e) => setQuestionData({...questionData, description: e.target.value})}
                        sx={{
                            "& .MuiInputLabel-root": {color: "#66bb6a"},
                            "& .MuiOutlinedInput-root": {"& fieldset": {borderColor: "#81c784"}},
                            mb: 2,
                        }}
                    />
                    <TextField
                        label="Час на питання (секунди)"
                        type="number"
                        required
                        fullWidth
                        margin="normal"
                        value={questionData.seconds_left || 10} // Мінімальне значення 10
                        onChange={(e) => {
                            const value = Math.max(10, parseInt(e.target.value, 10) || 10); // Мінімальне значення 10
                            setQuestionData({...questionData, seconds_left: value});
                        }}
                        sx={{
                            "& .MuiInputLabel-root": {color: "#66bb6a"},
                            "& .MuiOutlinedInput-root": {"& fieldset": {borderColor: "#81c784"}},
                            mb: 2,
                        }}
                    />
                    <Box>
                        <Button variant="contained" component="label"
                                style={{
                                    backgroundColor: "#66bb6a",
                                }}>
                            Завантажити зображення
                            <input type="file" hidden onChange={handleImageUpload}/>
                        </Button>

                        {questionData.image && questionData.image !== `/storage/` && (
                            <Box mt={2}>
                                <img
                                    ref={imageRef}
                                    src={questionData.image}
                                    alt="Selected"
                                    style={{width: "100%", cursor: questionData.type === 'image' ? "crosshair" : "default"}}
                                    onClick={handleImageClick}
                                />
                                {questionData.type === 'image' && <Box mt={2}>
                                    {questionData.coordinates?.[0] && <p>Ліва верхня координата: ({questionData.coordinates[0]}, {questionData.coordinates[1]})</p>}
                                    {questionData.coordinates?.[2] && <p>Права нижня координата: ({questionData.coordinates[2]}, {questionData.coordinates[3]})</p>}
                                </Box>}
                            </Box>
                        )}
                    </Box>
                    <FormControl fullWidth margin="normal" sx={{mb: 2}}>
                        <InputLabel sx={{
                            color: "#66bb6a",
                            "&.Mui-focused": {color: "#388e3c"},
                        }}>Тип питання</InputLabel>
                        <Select
                            variant="outlined"
                            label="Тип питання"
                            value={questionData.type}
                            onChange={(e) => setQuestionData({...questionData, type: e.target.value})}
                            sx={{
                                '.MuiOutlinedInput-notchedOutline': {
                                    borderColor: "#66bb6a",
                                },
                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                    borderColor: "#66bb6a",
                                },
                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                    borderColor: "#66bb6a",
                                },
                            }}
                        >
                            {Object.entries(questionTypes).map(([key, label]) => (
                                <MenuItem key={key} value={key}>
                                    {label}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    {questionData.type === "single_answer" && (
                        <TextField
                            label="Правильна відповідь"
                            required
                            fullWidth
                            margin="normal"
                            value={questionData.single_answer}
                            onChange={(e) => setQuestionData({...questionData, single_answer: e.target.value})}
                            sx={{
                                "& .MuiInputLabel-root": {color: "#66bb6a"},
                                "& .MuiOutlinedInput-root": {"& fieldset": {borderColor: "#81c784"}},
                            }}
                        />
                    )}
                    {questionData.type === "questions" && (
                        <Box>
                            <RadioGroup>
                                {questionData.questions?.map((option, index) => (
                                    <Box key={index} sx={{display: "flex", alignItems: "center", gap: "10px", mb: 1}}>
                                        <FormControlLabel
                                            control={
                                                <Radio
                                                    checked={option.correct === true || option.correct === '1'}
                                                    onChange={() => handleOptionChange(index, "correct", true)}
                                                    color="success"
                                                />
                                            }
                                            label=""
                                        />
                                        <TextField
                                            label={`Варіант ${index + 1}`}
                                            fullWidth
                                            value={option.text}
                                            onChange={(e) => handleOptionChange(index, "text", e.target.value)}
                                        />
                                        <IconButton color="error" onClick={() => handleDeleteOption(index)}>
                                            <DeleteIcon/>
                                        </IconButton>
                                    </Box>
                                ))}
                            </RadioGroup>
                            <Button
                                startIcon={<AddCircleIcon/>}
                                onClick={handleAddOption}
                                sx={{mb: 2, borderColor: "#66bb6a", color: "#66bb6a", borderRadius: "30px"}}
                            >
                                Додати варіант
                            </Button>
                        </Box>
                    )}
                </DialogContent>
                <DialogActions sx={{justifyContent: "space-between"}}>
                    <Button
                        onClick={onClose}
                        variant="outlined"
                        startIcon={<CloseIcon/>}
                        sx={{borderColor: "#66bb6a", color: "#66bb6a", borderRadius: "30px"}}
                    >
                        Скасувати
                    </Button>
                    <Button
                        onClick={handleSave}
                        variant="contained"
                        startIcon={<SaveIcon/>}
                        sx={{backgroundColor: "#66bb6a", borderRadius: "30px"}}
                    >
                        Зберегти
                    </Button>
                </DialogActions>
            </Dialog>

            <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity="warning" sx={{width: "100%"}}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </>
    );
}

export default AddQuestionDialog;
