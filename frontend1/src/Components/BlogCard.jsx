import * as React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Button } from '@mui/material';

const BlogCard = ({ title, description, image, _id }) => {
    return (
        <Card sx={{ width: 280, height: 320, display: 'flex', flexDirection: 'column', margin: '5px' }}>
            <CardMedia
                component="img"
                sx={{
                    height: 170,
                    objectFit: 'cover',
                }}
                image={image || 'https://via.placeholder.com/250x160'} // Fallback image if none provided
                alt={title}
            />
            <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                    {title}
                </Typography>
                <Typography
                    variant="body2"
                    sx={{
                        color: 'text.secondary',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitBoxOrient: 'vertical',
                        WebkitLineClamp: 2,
                    }}>
                    {description}
                </Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: 'space-between', paddingTop: 0 }}>
                <Button variant="contained" color="primary" sx={{ fontSize: '0.75rem', padding: '6px 12px' }}>
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
