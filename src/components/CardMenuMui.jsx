import Card from '@mui/material/Card';
import { CardActionArea } from '@mui/material'
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import React from 'react'
import { Link } from 'react-router-dom';

const CardMenu = ({icono}) => {
    const card = (
        <React.Fragment>
            <CardActionArea component={Link} to="/questions">
                <CardContent>
                    <Typography align='center' sx={{ mb: 1.5 }}>
                        {icono}
                    </Typography>
                    
                    {/* <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Word of the Day
                    </Typography> */}
                    
                    <Typography variant="h5" component="div">
                        Prueba
                    </Typography>
                </CardContent>
            </CardActionArea>
            
        </React.Fragment>
    );
  return (
    <Card variant="outlined">{card}</Card>
  )
}

export default CardMenu