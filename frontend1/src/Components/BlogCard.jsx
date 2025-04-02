import React, { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button, Box } from "@mui/material";
import BlogContext from "../Context/Blogcontext";

const BlogCard = ({ title, description, image, _id, blogLike, authorName, onDelete }) => {
    const [liked, setLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(blogLike.length);
    const navigate = useNavigate();
    const location = useLocation();
    const isProfilePage = location.pathname === "/ownerpage";
    const { likeBlog } = useContext(BlogContext);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user && blogLike.includes(user.id)) {
            setLiked(true);
        }
    }, [blogLike]);

    const handleLikeClick = async () => {
        setLiked(prevLiked => !prevLiked);
        setLikeCount(prevCount => (liked ? prevCount - 1 : prevCount + 1));
        await likeBlog(_id);
    };

    return (
        <Card
            sx={{
                width: 280,
                height: 350,
                margin: "5px",
                position: "relative",
                transition: "all 0.3s ease-in-out",
                "&:hover": { boxShadow: 6 },
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between"
            }}
        >
            <CardMedia
                component="img"
                sx={{ height: 170, objectFit: "cover" }}
                image={image || "https://via.placeholder.com/250x160"}
                alt={title}
            />
            <CardContent>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    {title}
                </Typography>
                <Typography variant="subtitle2" color="text.secondary">
                    By {authorName || "Unknown"}
                </Typography>
                <Typography
                    variant="body2"
                    sx={{
                        color: "text.secondary",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                    }}
                >
                    {description}
                </Typography>
            </CardContent>

            {isProfilePage && (
                <CardActions
                    sx={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                        borderRadius: "0 0 0 10px",
                        display: "flex",
                        flexDirection: "column",
                        padding: "0px",
                    }}
                >
                    <IconButton
                        color="primary"
                        onClick={() => navigate(`/editPage/${_id}`, { state: { blog: { title, description, image, _id } } })}
                    >
                        <EditIcon />
                    </IconButton>
                    <IconButton color="error" onClick={() => onDelete(_id)}>
                        <DeleteIcon />
                    </IconButton>
                </CardActions>
            )}

            <CardActions sx={{ display: "flex", justifyContent: "space-between", padding: "8px 16px" }}>
                <Button
                    variant="contained"
                    color="primary"
                    sx={{ fontSize: "0.75rem" }}
                    onClick={() => navigate(`/blog/${_id}`)}
                >
                    Read more
                </Button>
                <Box display="flex" alignItems="center" gap={1}>
                    <IconButton aria-label="like" onClick={handleLikeClick} color={liked ? "error" : "default"}>
                        <FavoriteIcon />
                    </IconButton>
                    <Typography variant="body2" color="text.secondary">
                        {likeCount}
                    </Typography>
                </Box>
            </CardActions>
        </Card>
    );
};

export default BlogCard;
