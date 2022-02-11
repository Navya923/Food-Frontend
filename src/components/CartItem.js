import React from 'react';
import Button from '@mui/material/Button';

const CartItem = ({product, changeQuantity}) => {
    return (
        <div className="cart-item">
            <img src={product.url} alt="cart-item" className="cart-item-image" />
            <div>
                <div>
                    <p className="item-title">{product.title}</p>
                    <span className="cart-item-price">Rs {product.price}</span>
                </div>
                <div>
                    <p className="item-quantity">Quantity: <span>{product.quantity}</span></p>
                    <p className="item-quantity">Discount: <span>{product.discount}</span></p>
                    <div>
                     <Button className="quantity-btn"  onClick={() => changeQuantity(product, '-')}>-</Button>
                     <Button className="quantity-btn"  onClick={() => changeQuantity(product, '+')}>+</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartItem;
