import React, { useState } from "react";
import {
    Box, Typography, Container, CssBaseline, Paper, Avatar, Grid,
    Card, CardContent, CardActions, Button
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

function UserProfile({ user, quests }) {
    const [preview, setPreview] = useState(user.avatar || null);

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
                            <Typography variant="h5" sx={{ fontWeight: "bold", color: "#388e3c", mb: 1 }}>{user.name}</Typography>
                            <Typography variant="body1" sx={{ color: "#666", mb: 2 }}>{user.email}</Typography>
                            <Typography variant="body2" sx={{ color: "#888", mb: 1 }}>Приєднався: {new Date(user.created_at).toLocaleDateString()}</Typography>
                        </Paper>
                    </Grid>

                    <Grid item xs={12} md={8}>

                        <Paper sx={{ padding: "30px", borderRadius: "16px", boxShadow: 5, backgroundColor: "#ffffff", mt: 4, position: "relative" }}>
                            <Box sx={{ position: "absolute", top: 0, left: 0, width: 60, height: 60, backgroundColor: "#b2fab4", borderRadius: "0 0 100px 0" }} />
                            <Box sx={{ position: "absolute", bottom: 0, right: 0, width: 60, height: 60, backgroundColor: "#b2fab4", borderRadius: "100px 0 0 0" }} />

                            <Typography variant="h5" sx={{ fontWeight: "bold", color: "#333", mb: 2, textAlign: "center" }}>Квести користувача</Typography>

                            <div style={{ maxHeight: "500px", overflowY: "auto" }}>
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
                                                        <Button href={`/quests/${quest.id}`}  size="small" variant="contained" startIcon={<PlayArrowIcon />} sx={{ backgroundColor: "#66bb6a", borderRadius: "30px" }}>
                                                            Грати
                                                        </Button>
                                                    </CardActions>
                                                </Card>
                                            </Grid>
                                        ))}
                                    </Grid>
                                ) : (
                                    <Typography variant="body2" sx={{ color: "#888", textAlign: "center", mt: 2 }}>У користувача поки немає квестів.</Typography>
                                )}
                            </div>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}

export default UserProfile;
