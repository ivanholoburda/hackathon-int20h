import React, { useState } from "react";
import { Head, Link } from "@inertiajs/react";
import {
    Box,
    Container,
    CssBaseline,
    Paper,
    Typography,
    Grid,
    Card,
    CardContent,
    Button,
    Pagination,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

const getStatusColor = (status) => {
    switch (status) {
        case "IN_PROGRESS":
            return "#4CAF50";
        case "WAITING":
            return "#FF9800";
        case "COMPLETED":
            return "#9E9E9E";
        default:
            return "#000";
    }
};

function Rooms({ rooms }) {
    const [page, setPage] = useState(1);
    const itemsPerPage = 6;

    const totalPages = Math.ceil(rooms.length / itemsPerPage);
    const currentRooms = rooms.slice((page - 1) * itemsPerPage, page * itemsPerPage);

    return (
        <Box sx={{ minHeight: "100vh", py: 5 }}>
            <CssBaseline />
            <Head title="Активні кімнати" />

            <Container maxWidth="md">
                <Paper sx={{ padding: "30px", borderRadius: "16px", boxShadow: 5, backgroundColor: "#fff" }}>
                    <Box display="flex" alignItems="center" justifyContent="space-between" mb={3}>
                        <Typography variant="h5" sx={{ fontWeight: "bold", color: "#333" }}>
                            🎮 Активні кімнати
                        </Typography>
                        <Button
                            component={Link}
                            href="/"
                            variant="outlined"
                            startIcon={<ArrowBackIcon />}
                            sx={{
                                borderRadius: "30px",
                                color: "#66bb6a",
                                borderColor: "#66bb6a",
                                "&:hover": { backgroundColor: "#388e3c", color: "#fff" },
                            }}
                        >
                            Назад
                        </Button>
                    </Box>

                    {rooms.length > 0 ? (
                        <>
                            <Grid container spacing={3}>
                                {currentRooms.map((room) => (
                                    <Grid item xs={12} sm={6} key={room.id}>
                                        <Card
                                            sx={{
                                                boxShadow: 3,
                                                borderRadius: "12px",
                                                transition: "0.3s",
                                                "&:hover": { boxShadow: 6 },
                                            }}
                                        >
                                            <CardContent>
                                                <Typography
                                                    variant="h6"
                                                    sx={{
                                                        fontWeight: "bold",
                                                        color: "#66bb6a",
                                                        mb: 1,
                                                        display: "flex",
                                                        alignItems: "center",
                                                        gap: 1,
                                                    }}
                                                >
                                                    {room.quest.name}
                                                </Typography>
                                                <Typography variant="body2" sx={{ color: "#555" }}>
                                                    Власник: <b>{room.owner.name}</b>
                                                </Typography>
                                                <Typography variant="body2" sx={{ color: "#555" }}>
                                                    Макс. гравців: <b>{room.max_participants}</b>
                                                </Typography>
                                                <Typography
                                                    variant="body2"
                                                    sx={{
                                                        color: getStatusColor(room.status),
                                                        fontWeight: "bold",
                                                        mt: 1,
                                                    }}
                                                >
                                                    Статус: {room.status === "IN_PROGRESS" ? "Активна" : "Очікування"}
                                                </Typography>

                                                <Button
                                                    href={`/rooms/${room.id}`}
                                                    size="small"
                                                    variant="contained"
                                                    startIcon={<PlayArrowIcon />}
                                                    sx={{
                                                        mt: 2,
                                                        borderRadius: "8px",
                                                        backgroundColor: "#66bb6a",
                                                        "&:hover": { backgroundColor: "#388e3c" },
                                                    }}
                                                >
                                                    Приєднатися
                                                </Button>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>

                            <Box display="flex" justifyContent="center" alignItems="center" mt={3}>
                                <Pagination
                                    count={totalPages}
                                    page={page}
                                    onChange={(_, value) => setPage(value)}
                                    color="primary"
                                />
                            </Box>
                        </>
                    ) : (
                        <Typography
                            variant="body2"
                            sx={{ color: "#888", textAlign: "center", mt: 3, fontSize: "1.1rem" }}
                        >
                            Активних кімнат нема.
                        </Typography>
                    )}
                </Paper>
            </Container>
        </Box>
    );
}

export default Rooms;
