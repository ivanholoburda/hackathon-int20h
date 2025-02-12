import React, { useState } from "react";
import { useForm, Link } from "@inertiajs/react";
import {
    Box, Typography, Container, CssBaseline, Paper, Avatar, Grid,
    Card, CardContent, CardActions, Button, TextField, IconButton
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import HistoryIcon from "@mui/icons-material/History";
import UploadIcon from "@mui/icons-material/Upload";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

function Profile({ user, quests: initialQuests, games }) {
    const { data, setData, post } = useForm({
        name: user.name,
        email: user.email,
        avatar: null,
    });
    console.log(games);
    const [isEditing, setIsEditing] = useState(false);
    const [preview, setPreview] = useState(user.avatar || null);
    const [quests] = useState(initialQuests);
    const [currentQuestIndex, setCurrentQuestIndex] = useState(0);

    const animatedButtonStyles = {
        transition: "all 0.3s ease",
        "&:hover": {
            transform: "scale(1.05)",
            boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.1)",
            backgroundColor: "#388e3c",
            color: "#fff",
        },
        "&:active": {
            transform: "scale(1.02)",
        },
    };
    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData("avatar", file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSave = () => {
        post("/profile/update", {
            onSuccess: () => setIsEditing(false),
        });
    };

    const handleLogout = () => {
        post("/logout", {
            onSuccess: () => window.location.href = "/",
        });
    };

    const loadMoreQuests = () => {
        if (loading || !hasMore) return;

        setLoading(true);
        fetch(`/user-quests?page=${page + 1}`)
            .then((response) => response.json())
            .then((data) => {
                setQuests((prevQuests) => [...prevQuests, ...data.quests]);
                setPage((prevPage) => prevPage + 1);
                setHasMore(data.hasMore);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    };

    const handleScroll = (e) => {
        const bottom = e.target.scrollHeight === e.target.scrollTop + e.target.clientHeight;
        if (bottom) {
            loadMoreQuests();
        }
    };

    return (
        <Box sx={{ minHeight: "100vh", backgroundColor: "#e8f5e9", py: 5 }}>
            <CssBaseline />
            <Container component="main" maxWidth="lg">
                <Grid container spacing={4} alignItems="flex-start">
                    <Grid item xs={12} md={4}>
                        <Paper sx={{ display: "flex", flexDirection: "column", alignItems: "center", p: 4, borderRadius: "12px", boxShadow: 5, backgroundColor: "#ffffff" }}>
                            <Avatar sx={{ width: 100, height: 100, bgcolor: "#81c784", mb: 2 }} src={preview}>
                                {!preview && <AccountCircleIcon sx={{ fontSize: 50 }} />}
                            </Avatar>

                            {isEditing ? (
                                <>
                                    <input type="file" accept="image/*" id="avatar-upload" style={{ display: "none" }} onChange={handleAvatarChange} />
                                    <label htmlFor="avatar-upload">
                                        <Button variant="outlined" startIcon={<UploadIcon />} component="span" sx={{ borderColor: "#66bb6a", color: "#388e3c", borderRadius: "30px", mb: 2, ...animatedButtonStyles }}>
                                            Завантажити аватар
                                        </Button>
                                    </label>
                                    <TextField label="Ім'я" variant="outlined" fullWidth value={data.name} onChange={(e) => setData("name", e.target.value)} sx={{ mb: 2 }} />
                                    <Box display="flex" gap={2}>
                                        <Button variant="contained" startIcon={<SaveIcon />} onClick={handleSave} sx={{ backgroundColor: "#66bb6a", borderRadius: "30px", ...animatedButtonStyles }}>
                                            Зберегти
                                        </Button>
                                        <Button variant="outlined" startIcon={<CloseIcon />} onClick={() => setIsEditing(false)} sx={{ borderColor: "#d32f2f", color: "#d32f2f", borderRadius: "30px", ...animatedButtonStyles }}>
                                            Скасувати
                                        </Button>
                                    </Box>
                                </>
                            ) : (
                                <>
                                    <Typography variant="h5" sx={{ fontWeight: "bold", color: "#388e3c", mb: 1 }}>{user.name}</Typography>
                                    <Typography variant="body1" sx={{ color: "#666", mb: 2 }}>{user.email}</Typography>
                                    <Typography variant="body2" sx={{ color: "#888", mb: 1 }}>Приєднався: {new Date(user.created_at).toLocaleDateString()}</Typography>
                                    <Button variant="outlined" startIcon={<EditIcon />} onClick={() => setIsEditing(true)} sx={{ borderColor: "#66bb6a", color: "#66bb6a", borderRadius: "30px", ...animatedButtonStyles }}>
                                        Редагувати
                                    </Button>
                                </>
                            )}
                            <Button
                                variant="outlined"
                                startIcon={<ExitToAppIcon />}
                                onClick={handleLogout}
                                sx={{
                                    mt: 2,
                                    borderColor: "#d32f2f",
                                    color: "#d32f2f",
                                    borderRadius: "30px",
                                    "&:hover": {
                                        backgroundColor: "#d32f2f",
                                        color: "#ffffff",
                                        borderColor: "#d32f2f",
                                    }
                                }}
                            >
                                Вийти
                            </Button>
                        </Paper>
                    </Grid>

                    <Grid item xs={12} md={8}>
                        <Paper sx={{ p: 3, mb: 4, borderRadius: "12px", boxShadow: 5, backgroundColor: "#ffffff" }}>
                            <Typography variant="h5" sx={{ fontWeight: "bold", color: "#333", mb: 2 }}>
                                Історія пройдених квестів
                            </Typography>

                            {games?.length > 0 ? (
                                <Grid container spacing={3}>
                                    {games.map((game) => (
                                        <Grid item xs={12} sm={6} key={game.id}>
                                            <Card sx={{ boxShadow: 3, borderRadius: "12px" }}>
                                                <CardContent>
                                                    <Typography variant="h6" sx={{ fontWeight: "bold", color: "#2e7d32", mb: 1 }}>
                                                        {game.quest?.name || "Невідомий квест"}
                                                    </Typography>
                                                    <Typography variant="body2" sx={{ color: "#555" }}>
                                                        Місце: {game.place || "Невідоме місце"}
                                                    </Typography>
                                                    {game.created_at ? (
                                                        <Typography variant="body2" sx={{ color: "#555" }}>
                                                            Дата: {new Date(game.created_at).toLocaleDateString()}
                                                        </Typography>
                                                    ) : (
                                                        <Typography variant="body2" sx={{ color: "#888" }}>
                                                            Дата невідома
                                                        </Typography>
                                                    )}
                                                </CardContent>
                                            </Card>
                                        </Grid>
                                    ))}
                                </Grid>
                            ) : (
                                <Typography variant="body2" sx={{ color: "#888", textAlign: "center", mt: 2 }}>
                                    Ви ще не проходили квести.
                                </Typography>
                            )}

                            <Box textAlign="center" mt={2}>
                                <Button component={Link} href="/games-history" variant="outlined" startIcon={<HistoryIcon />} sx={{ borderColor: "#388e3c", color: "#388e3c", borderRadius: "30px" }}>
                                    Переглянути всю історію
                                </Button>
                            </Box>
                        </Paper>


                        <Paper sx={{ padding: "30px", borderRadius: "16px", boxShadow: 5, backgroundColor: "#ffffff", mt: 4, position: "relative" }}>
                            <Box sx={{ position: "absolute", top: 0, left: 0, width: 60, height: 60, backgroundColor: "#b2fab4", borderRadius: "0 0 100px 0" }} />
                            <Box sx={{ position: "absolute", bottom: 0, right: 0, width: 60, height: 60, backgroundColor: "#b2fab4", borderRadius: "100px 0 0 0" }} />

                            <Typography variant="h5" sx={{ fontWeight: "bold", color: "#333", mb: 2, textAlign: "center" }}>Мої квести</Typography>

                            <div onScroll={handleScroll} style={{ maxHeight: "500px", overflowY: "auto" }}>
                                {quests.length > 0 ? (
                                    <Grid container spacing={3} sx={{ px: 2 }}>
                                        {quests.map((quest) => (
                                            <Grid item xs={12} sm={6} key={quest.id}>
                                                <Card sx={{
                                                    boxShadow: 3,
                                                    borderRadius: "12px",
                                                    transition: "transform 0.2s",
                                                    "&:hover": {
                                                        transform: "scale(1.05)",
                                                        boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.15)"
                                                    }
                                                }}>
                                                    <CardContent>
                                                        <Typography variant="h6" sx={{
                                                            fontWeight: "bold",
                                                            color: "#2e7d32",
                                                            mb: 1
                                                        }}>{quest.name}</Typography>
                                                        <Typography variant="body2" sx={{ color: "#555" }}>{quest.description}</Typography>
                                                    </CardContent>
                                                    <CardActions sx={{ justifyContent: "space-between", padding: "16px" }}>
                                                        <Button href={`/quests/${quest.id}`} size="small" variant="contained" startIcon={<PlayArrowIcon />} sx={{ backgroundColor: "#66bb6a", borderRadius: "30px" }}>
                                                            Грати
                                                        </Button>
                                                        <Button href={`/quests/${quest.id}/edit`} size="small" variant="outlined" sx={{
                                                            borderColor: "#66bb6a",
                                                            color: "#388e3c",
                                                            borderRadius: "30px"
                                                        }}>
                                                            Редагувати
                                                        </Button>
                                                    </CardActions>
                                                </Card>
                                            </Grid>
                                        ))}
                                    </Grid>
                                ) : (
                                    <Typography variant="body2" sx={{ color: "#888", textAlign: "center", mt: 2 }}>У вас поки немає квестів.</Typography>
                                )}
                            </div>

                            <Box textAlign="center" mt={3}>
                                <Button component={Link} href="/quests/create" variant="contained" startIcon={<AddCircleIcon />} sx={{ backgroundColor: "#66bb6a", borderRadius: "30px" }}>
                                    Створити новий квест
                                </Button>
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}

export default Profile;
