import React, { useState } from "react";
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
import { Button } from "@mui/material";

const BlogCard = ({ title, description, image, _id, onDelete }) => {
    const [hovered, setHovered] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    // Check if we are on the Profile Page
    const isProfilePage = location.pathname === "/ownerpage";

    return (
        <Card
            sx={{
                width: 280,
                height: 320,
                display: "flex",
                flexDirection: "column",
                margin: "5px",
                position: "relative",
                transition: "all 0.3s ease-in-out",
                "&:hover": {
                    boxShadow: 6,
                },
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <CardMedia
                component="img"
                sx={{
                    height: 170,
                    objectFit: "cover",
                }}
                image={image || "https://via.placeholder.com/250x160"} // Fallback image if none provided
                alt={title}
            />
            <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" component="div" sx={{ fontWeight: "bold" }}>
                    {title}
                </Typography>
                <Typography
                    variant="body2"
                    sx={{
                        color: "text.secondary",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitBoxOrient: "vertical",
                        WebkitLineClamp: 2,
                    }}
                >
                    {description}
                </Typography>
            </CardContent>

            {/* Hovered Buttons (Only on Profile Page) */}
            {isProfilePage && hovered && (
                <CardActions
                    sx={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                        borderRadius: "0 0 0 10px",
                        display: "flex",
                        flexDirection: "column",
                        padding: "5px",
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

            <CardActions sx={{ justifyContent: "space-between", paddingTop: 0 }}>
                <Button
                    variant="contained"
                    color="primary"
                    sx={{ fontSize: "0.75rem", padding: "6px 12px" }}
                    onClick={() => navigate(`/blog/${_id}`)}
                >
                    Read more
                </Button>
                <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                </IconButton>
            </CardActions>
        </Card>
    );
};

export default BlogCard;
