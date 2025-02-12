import React from 'react';
import { Paper, Typography, Box, Grid } from '@mui/material';

export default function Leaderboard({ users }) {
    return (
        <Box sx={{ minHeight: "100vh", backgroundColor: "#e8f5e9", py: 5 }}>
            <Typography
                variant="h4"
                sx={{
                    fontWeight: "bold",
                    color: "white",
                    textAlign: "center",
                    mb: 6,
                    py: 2,
                    borderRadius: "12px",
                    background: "linear-gradient(90deg, #4caf50 0%, #388e3c 100%)",
                    boxShadow: 3
                }}
            >
                🏆 Рейтинг авторів 🏆
            </Typography>
            <Grid container justifyContent="center">
                <Grid item xs={12} md={10}>
                    <Paper sx={{ p: 4, borderRadius: "16px", boxShadow: 6, backgroundColor: "#ffffff" }}>
                        <Box sx={{ overflowX: "auto" }}>
                            <table className="w-full border-collapse shadow-lg rounded-lg overflow-hidden min-w-[600px]">
                                <thead>
                                <tr className="bg-green-700 text-white text-lg sm:text-xl">
                                    <th className="p-3 sm:p-4 text-left">№</th>
                                    <th className="p-3 sm:p-4 text-left">Користувач</th>
                                    <th className="p-3 sm:p-4 text-left">Електронна пошта</th>
                                    <th className="p-3 sm:p-4 text-left">⭐ Рейтинг</th>
                                </tr>
                                </thead>
                                <tbody>
                                {users.map((user, index) => (
                                    <tr
                                        key={user.id}
                                        className="border-b hover:bg-green-50 transition-all duration-200 ease-in-out"
                                        style={{ cursor: "pointer" }}
                                        onClick={() => window.location.href = `/profile/${user.id}`}
                                    >
                                        <td className="p-3 sm:p-4 font-bold text-md sm:text-lg">{index + 1}</td>
                                        <td className="p-3 sm:p-4 font-semibold text-gray-800 text-md sm:text-lg">{user.name}</td>
                                        <td className="p-3 sm:p-4 text-gray-600 text-md sm:text-lg">{user.email}</td>
                                        <td className="p-3 sm:p-4 text-md sm:text-lg font-semibold text-green-700">
                                            {user.average_rating ? Number(user.average_rating).toFixed(2) : "—"}
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
}
