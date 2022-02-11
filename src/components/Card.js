import React from 'react'
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const Card = ({data, addToCart}) => {
    return (
        <div className="card">
            <img src={data.url} className="card-image" alt="product" title={data.title} />
            <h3 className="card-title">{data.title}</h3>
            <p className="price">price: <span>Rs {data.price}</span></p>
            <button className="add-to-cart"  onClick={() => addToCart(data)}>Add to cart</button>
        </div>
    )
}

export default Card;