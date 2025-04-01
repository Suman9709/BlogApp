import * as React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Button } from '@mui/material';
import bloglogo from "../Components/ImgAssets/bloglogo.png"


const BlogCard = () => {
    return (
        <Card sx={{ maxWidth: 250 }}>
            <CardMedia
                component="img"
                height="194"
                image={bloglogo}
                alt="Paella dish"
            />
            <CardContent>
                <Typography>
                    Title
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    This impressive paella is a perfect party dish and a fun meal to cook
                    together with your guests.
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <Button variant="contained" color="primary">Read more</Button>
                <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                </IconButton>

            </CardActions>

        </Card>
    );
}

export default BlogCard