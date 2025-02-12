import React from "react";
import { Head, Link } from "@inertiajs/react";
import {
    Box, Container, CssBaseline, Paper, Typography, Grid, Card,
    CardContent, Button, Pagination
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function History({ games }) {
    return (
        <Box sx={{ minHeight: "100vh", backgroundColor: "#e8f5e9", py: 5 }}>
            <CssBaseline />
            <Head title="Історія ігор" />

            <Container maxWidth="md">
                <Paper sx={{ padding: "30px", borderRadius: "16px", boxShadow: 5, backgroundColor: "#ffffff" }}>
                    <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
                        <Typography variant="h5" sx={{ fontWeight: "bold", color: "#333" }}>
                            Історія пройдених квестів
                        </Typography>
                        <Button
                            component={Link}
                            href="/profile"
                            variant="outlined"
                            startIcon={<ArrowBackIcon />}
                            sx={{ borderRadius: "30px", color: "#388e3c", borderColor: "#388e3c" }}
                        >
                            Назад
                        </Button>
                    </Box>

                    {games.data.length > 0 ? (
                        <>
                            <Grid container spacing={3}>
                                {games.data.map((game) => (
                                    <Grid item xs={12} sm={6} key={game.id}>
                                        <Card sx={{ boxShadow: 3, borderRadius: "12px" }}>
                                            <CardContent>
                                                <Typography variant="h6" sx={{ fontWeight: "bold", color: "#2e7d32", mb: 1 }}>
                                                    {game.quest.name}
                                                </Typography>
                                                <Typography variant="body2" sx={{ color: "#555" }}>
                                                    Місце: {game.place}
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

                            {/* Пагинация */}
                            <Box display="flex" justifyContent="center" mt={3}>
                                {games.links && (
                                    <Pagination
                                        count={games.last_page}
                                        page={games.current_page}
                                        onChange={(event, page) => {
                                            window.location.href = `?page=${page}`;
                                        }}
                                        color="primary"
                                    />
                                )}
                            </Box>
                        </>
                    ) : (
                        <Typography variant="body2" sx={{ color: "#888", textAlign: "center", mt: 2 }}>
                            Ви ще не проходили квести.
                        </Typography>
                    )}
                </Paper>
            </Container>
        </Box>
    );
}

export default History;
