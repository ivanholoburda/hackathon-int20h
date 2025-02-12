import React, { useState, useEffect, useRef, useCallback } from "react";
import { Box, Typography, List, ListItem, Rating, TextField, Button, CircularProgress } from "@mui/material";
import { router } from "@inertiajs/react";
import axios from "axios";

function ReviewList({ questId, can_leave_review }) {
    const [newReview, setNewReview] = useState({ text: "", rating: 5 });
    const [allReviews, setAllReviews] = useState([]);
    const [nextPageUrl, setNextPageUrl] = useState(null);
    const [loading, setLoading] = useState(false);
    const observer = useRef();

    useEffect(() => {
        fetchReviews(`/quests/${questId}/reviews`);
    }, []);

    const fetchReviews = (url) => {
        if (!url || loading) return;
        setLoading(true);
        axios.get(url)
            .then((response) => {
                setAllReviews(prevReviews => [...prevReviews, ...response.data.reviews]);
                setNextPageUrl(response.data.next_page_url);
            })
            .catch(error => console.error("Error fetching reviews:", error))
            .finally(() => setLoading(false));
    };

    const handleAddReview = () => {
        if (newReview.text.trim() === "") {
            alert("Введіть текст відгуку.");
            return;
        }

        router.post(`/quests/${questId}/reviews`, {
            quest_id: questId,
            rating: newReview.rating,
            text: newReview.text,
        }, {
            onSuccess: () => {
                setNewReview({ text: "", rating: 5 });
                setAllReviews([]);
                fetchReviews(`/quests/${questId}/reviews`);
            },
            onError: () => alert("Помилка при додаванні відгуку.")
        });
    };

    const lastReviewRef = useCallback(node => {
        if (loading) return;
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && nextPageUrl) {
                fetchReviews(nextPageUrl);
            }
        });
        if (node) observer.current.observe(node);
    }, [loading, nextPageUrl]);

    return (
        <Box mt={4}>
            <Typography variant="h5" sx={{ mb: 3, textAlign: "center", fontWeight: 500, fontSize: "1.8rem" }}>
                Відгуки
            </Typography>

            {
                can_leave_review ?
                    <Box sx={{ mt: 4, padding: "20px", backgroundColor: "#f9f9f9", borderRadius: "8px", maxWidth: "800px", margin: "0 auto" }}>
                        <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>Залишити відгук</Typography>
                        <TextField
                            label="Ваш відгук"
                            multiline
                            rows={4}
                            fullWidth
                            value={newReview.text}
                            onChange={(e) => setNewReview({ ...newReview, text: e.target.value })}
                            sx={{ mb: 2 }}
                        />
                        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                            <Typography variant="body2">Рейтинг: </Typography>
                            <Rating
                                value={newReview.rating}
                                onChange={(e, newValue) => setNewReview({ ...newReview, rating: newValue })}
                                precision={1}
                                sx={{ mr: 2 }}
                            />
                        </Box>
                        <Button
                            variant="contained"
                            sx={{ backgroundColor: "#66bb6a" }}
                            onClick={handleAddReview}
                        >
                            Додати відгук
                        </Button>
                    </Box>
                    :
                    <Typography sx={{ textAlign: "center", mt: 2 }}>Ви не зможете залишити відгук сам собі або ви вже залишили відгук!</Typography>
            }

            <List sx={{ maxWidth: "800px", margin: "0 auto" }}>
                {allReviews.map((review, index) => {
                    const reviewDate = review.created_at ? new Date(review.created_at) : null;
                    return (
                        <ListItem
                            key={review.id}
                            divider
                            ref={index === allReviews.length - 1 ? lastReviewRef : null}
                            sx={{
                                mb: 3,
                                borderRadius: "8px",
                                boxShadow: 2,
                                padding: "15px",
                                backgroundColor: "#f9f9f9",
                                display: "flex",
                                justifyContent: "space-between",
                            }}
                        >
                            <Box sx={{ display: "flex", flexDirection: "column", width: "80%" }}>
                                <Typography variant="body1" sx={{ fontWeight: "bold", color: "#388e3c" }}>
                                    {review.user.name}
                                </Typography>
                                <Box sx={{ display: "flex", alignItems: "center" }}>
                                    <Rating value={review.rating} readOnly sx={{ color: "#ffa000" }} />
                                </Box>
                                <Typography variant="body2" sx={{ color: "#666", mt: 1 }}>
                                    {review.text}
                                </Typography>
                            </Box>
                            <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "flex-end", textAlign: "right" }}>
                                <Typography variant="body2" sx={{ color: "#888" }}>
                                    {reviewDate ? reviewDate.toLocaleString() : "Дата не вказана"}
                                </Typography>
                            </Box>
                        </ListItem>
                    );
                })}
            </List>

            {loading && <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}><CircularProgress /></Box>}
            {!allReviews.length && !loading && <Typography sx={{ textAlign: "center", mt: 2 }}>Відгуки відсутні</Typography>}
        </Box>
    );
}

export default ReviewList;
