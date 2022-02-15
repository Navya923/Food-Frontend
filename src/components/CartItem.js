import React from 'react';
import Button from '@mui/material/Button';

const CartItem = ({cart, changeQuantity}) => {
    return (
        <div className="cart-item">
            <img src={cart.product.url} alt="cart-item" className="cart-item-image" />
            <div>
                <div>
                    <p className="item-name">{cart.product.name}</p>
                    <span className="cart-item-price">Rs {cart.product.price}</span>
                </div>
                <div>
                    <p className="item-quantity">Quantity: <span>{cart.quantity}</span></p>
                    <p className="item-quantity">Discount: <span>{cart.product.discount}</span></p>
                    <div>
                     <Button className="quantity-btn"  onClick={() => changeQuantity(cart.product, '-')}>-</Button>
                     <Button className="quantity-btn"  onClick={() => changeQuantity(cart.product, '+')}>+</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartItem;
