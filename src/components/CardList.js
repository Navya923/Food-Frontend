import React, { Fragment, useState, useEffect } from 'react';

import Card from '@mui/material/Card';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const CardList = ({ products, addToCart }) => {

    const [delay, setDelay] = useState(true)

    useEffect(() => {
        setDelay(true);
        setTimeout(() => {
            setDelay(false)
        }, 1000);
    }, [products])

    const TopPick=()=>{
        return(
            <p>
               Top Pick <StarBorderIcon color="success"/>
            </p>
        )
    }
    return (
        <Fragment>
            {
                delay ? <img src="https://career.alliedvision.com/persis/images_avt/gicccccphy.gif" alt="loader" className="loader" />
                    :
                    <div>
                        <span className="products-length">{products.length} Product(s) found.</span>
                        <div className="card-list">
                            {
                                products.length === 0 ? <p className="text-center">Sorry, No products of the specified categories :-(</p> :
                                    products.map(item => {
                                        return (
                                            <div style={{ margin: '10px' }}>
                                                <Card sx={{ maxWidth: 200 }}>
                                                
                                                    <CardMedia
                                                        component="img"
                                                        alt="green iguana"
                                                        height="100"
                                                        image={item.url}
                                                    />
                                                    <CardContent>
                                                        <Typography gutterBottom variant="h5" component="div">
                                                            <h3>{item.name}</h3>
                                                        </Typography>
                                                        <Typography variant="body2" color="red">
                                                            Mrp:Rs {item.price}
                                                        </Typography>
                                                        <Typography variant="body2" color="text.secondary">
                                                            Discount {item.discount}
                                                        </Typography>
                                                        <Typography variant="body2" color="text.secondary">
                                                            {item.topPick?
                                                            <TopPick />
                                                            :
                                                            <p>&nbsp;</p>
                                                            }
                                                        </Typography> 
                                                    </CardContent>
                                                    <CardActions>
                                                        <Button variant="contained" color="success" onClick={() => addToCart(item)} size="small" >Add to Cart</Button>
                                                    </CardActions>
                                                </Card>
                                                
                                            </div>
                                        )
                                    })
                            }
                        </div>
                    </div>
            }
        </Fragment>
    )
}

export default CardList;