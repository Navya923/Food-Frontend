import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Resturants from './components/Resturants';

import Products from './components/Products';
import AllProducts from './products.json';
import Cart from './components/Cart';
import filterList from './components/filterList';
import Navbar from './components/Navbar';




const App = () => {

  const [products, setProducts] = useState([]);
  const [selectedResturants, setSelectedResturants] = useState([]);
  const [cart, setCart] = useState([]);
  const [MountFlag, setMountFlag] = useState(true);
  const [Search, SearchIconWrapper, StyledInputBase ] = useState([]);

  useEffect(() => {
    setProducts(filterList([], null));
    if (MountFlag) {
      axios.get('http://localhost:8080/Cart/cart/id')
        .then((response) => {
          console.log(response);
          setCart(response.data);
          setMountFlag(false)
        }).catch((err) => {
          console.log(err);
        })
    }
  }, [])

  const setResturant = (resturant) => {
    const resturants = [selectedResturants];
    let temp = '';
    if (resturant == 'EMPIRE') {
      temp = 'Empire';
    }
    if (resturant == 'ATRIA') {
      temp = 'Atria';
    }
    if (resturant == 'A2B') {
      temp = 'A2b';
    }
    if (resturant == 'CITRUS') {
      temp = 'Citrus';
    }
    console.log(products);
    let newArray = AllProducts.filter((element) => {
      if (element.resturant == temp) {
        return element;
      }
    })
    console.log(newArray)

    setProducts(newArray);
  }

  const sortProducts = (method) => {
    const array = products;

    if (method === "Lowest to Highest") {
      array.sort(function (a, b) {
        console.log(a.price, b.price)
        return a.price - b.price
      })
    }
    else if (method === "Highest to Lowest") {
      array.sort(function (a, b) {
        return b.price - a.price
      })
    }
    setProducts(array);
  }

  const addToCart = (item) => {
    const productList = [...cart];
    if (!productList.includes(item)) {
      productList.push(item);
    }
    const index = productList.indexOf(item);
    productList[index].quantity++;
    setCart(productList);

    console.log(item);
    axios.post("http://localhost:8080/Product/product", [{
      discount: item.discount,
      price: item.price,
      quantity: item.quantity,
      title: item.title,
      url: item.url
    }]

    ).then((response) => {
      console.log(response);
    })
      .catch((error) => {
        console.log(error);
      })
  }

  const changeQuantity = (item, e) => {
    const productList = [...cart];
    const index = productList.indexOf(item);
    if (e === '+') {
      productList[index].quantity++;
    }
    else {
      if (productList[index].quantity > 1) {
        productList[index].quantity--;
      }
      else {
        productList.splice(index, 1);
      }
    }
    setCart(productList);
  }

  const handleClearProducts = () => {
    console.log('clear', cart)
    setCart([]);
  }

  return (
    <div className="App">
     <Resturants selectedResturants={selectedResturants} setResturant={setResturant} />
      <Products products={products} sortProducts={sortProducts} addToCart={addToCart} />
      <Cart handleClearProducts={handleClearProducts} products={cart} changeQuantity={changeQuantity} />
      <Navbar selectedSearch={SearchIconWrapper} setSearch={StyledInputBase } />
    
    </div>
    );
  
}

export default App;