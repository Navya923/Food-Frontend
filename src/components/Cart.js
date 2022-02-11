import React, { Fragment, useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { pink } from '@mui/material/colors';
import { Dialog, DialogType, DialogFooter } from '@fluentui/react/lib/Dialog';
import { hiddenContentStyle, mergeStyles } from '@fluentui/react/lib/Styling';
import CartItem from './CartItem';
import { ContextualMenu } from '@fluentui/react/lib/ContextualMenu';
const Cart = ({ products, changeQuantity, handleClearProducts }) => {

    const [classActive, toggleClass] = useState(false);
    const [sum, setSum] = useState(0);
    const [viewDialog, setDialog] = useState(true);

    const toggleButton = () => {
        toggleClass(!classActive);
    }
    console.log(products);
    
    useEffect(() => {
        let total = 0;
        for (var i = 0; i < products.length; i++) {
            let discountNumber = Number(products[i].discount.slice(0, 2));
            let discountPrice = (products[i].price / 100) * discountNumber;

            total += (products[i].price - discountPrice) * products[i].quantity;
        }
        setSum(total);
    }, [products])

    const checkout = () => {
        console.log(products);
        setDialog(false);
        handleClearProducts();

    }


    return (
        <Fragment>
            <Dialog
                hidden={viewDialog}
                onDismiss={() => setDialog(!viewDialog)}
            >
                <h3>Hurray! </h3>
                <h4>Order Succesfull</h4>
                <DialogFooter>
                    <Button onClick={() => setDialog(!viewDialog)} className="checkout-btn" >Close</Button>
                </DialogFooter>
            </Dialog>

            <div id="sidebar" className={classActive ? "active" : ""}>
                <div className="sidebar-content">
                    <div className="toggle-btn" onClick={toggleButton}>
                        <div>{products.length}</div>
                        <AddShoppingCartIcon sx={{ color: pink[500] }} />
                    </div>
                    <div className="cart-content">
                        <h3>
                            <img src="https://checkout.advancedshippingmanager.com/wp-content/uploads/2015/10/Cart-Icon-PNG-Graphic-Cave-e1461785088730-300x300.png" alt="cart" />
                            Cart
                        </h3>

                        <div className="cart-list">
                            {
                                products.length === 0
                                    ?
                                    <div className="empty-cart">
                                        <p>There are no items in Cart, Please add items to checkout!!!</p>
                                    </div>
                                    :
                                    products.map(product => {
                                        return (
                                            <CartItem
                                                key={product.id}
                                                product={product}
                                                changeQuantity={changeQuantity}
                                            />
                                        )
                                    })
                            }
                        </div>

                        <div className="checkout-div">
                            <div className="checkout">
                                <div className="subtotal-div">
                                    <p className="subtotal">SUBTOTAL</p>
                                    <p className="subtotal-price">Rs {sum.toFixed(2)}</p>
                                </div>
                                
                                <Button className="checkout-btn" onClick={checkout}>CHECKOUT</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Cart;