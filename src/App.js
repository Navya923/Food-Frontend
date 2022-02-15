import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Products from './components/Products';
import Resturants from './components/Resturants';
import Cart from './components/Cart';
import filterList from './components/filterList';


const App = () => {

  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [selectedResturants, setSelectedResturants] = useState([]);

  const [cart, setCart] = useState([]);
  const [MountFlag, setMountFlag] = useState(true);
  const [Search, SearchIconWrapper, StyledInputBase] = useState([]);

  useEffect(() => {
    setProducts(filterList([], null));
    if (MountFlag) {
      axios.get('http://localhost:8080/Product')
        .then((response) => {
          console.log(response);
          setProducts(response.data);
          setAllProducts(response.data);
          setMountFlag(true)
        }).catch((err) => {
          console.log(err);
        })
    }
  }, [])

  const setResturant = (resturant) => {
    let newArray = [];
    if (resturant.name == 'AllProducts') {
      newArray = allProducts;
    } else {
      newArray = allProducts.filter((element) => {
        if (element.restaurantId == resturant.id) {
          return element;
        }
      })
    }
    setProducts(newArray);
  }


  const searchProducts = (text) => {
    // console.log('searchtext',text);
    let searchText = text.toLocaleLowerCase()
    let filteredProducts = allProducts.filter((product) => {
      let productName = product.name.toLocaleLowerCase();
      let restaurantName = product.restaurantName.toLocaleLowerCase();
      if (productName.includes(searchText) || restaurantName.includes(searchText)) {
        return product;
      }
    });
    // console.log(filteredProducts);
    setProducts(filteredProducts);
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
    axios.post("http://localhost:8080/Cart/cart", {
      "product":

      {
        "id": item.id,
        "quantity": item.quantity,
        "price": item.price,
        "name": item.name,
        "discount": item.discount,
        "restaurantId": item.restaurantId,
        "category": item.category,
        "topPick": item.topPick,
        "cart": item.cart,
        "url": item.url
      },
      "quantity":1

    }

    ).then((response) => {
      console.log(response);
    })
      .catch((error) => {
        console.log(error);
      })
  }

  const changeQuantity = (item, e) => {
    const productList = [...cart];
    console.log(item, e);
    const index = productList.indexOf(item);
    if (e === '+') {
      productList[index].quantity++;
      //update quantity of item
      axios.put('http://localhost:8080/Cart/cart', {
        id: '',
      })
        .then((Response) => {
          console.log(Response);
        }).catch((Err) => {
          console.log(Err);
        })
    }
    else {
      if (productList[index].quantity > 0) {
        productList[index].quantity--;
        //Remove item from Database
        axios.put('http://localhost:8080/Cart/cart', {
          id: '',
        })
          .then((Response) => {
            console.log(Response);
          }).catch((Err) => {
            console.log(Err);
          })
      }
      else {
        productList.splice(index, 1);
        //delete API
        axios.delete('http://localhost:8080/Cart/cart', {
          id: '',
        })
          .then((Response) => {
            console.log(Response);
          }).catch((Err) => {
            console.log(Err);
          })
      }
    }
    setCart(productList);
  }

  const handleClearProducts = () => {
    console.log('clear', cart);
    let CartItems = [];
    axios.get('http://localhost:8080/Cart/cart')
      .then((response) => {
        console.log(response);
        CartItems = response.data;
      }).catch((err) => {
        console.log(err);
      })
    CartItems.map((element) => {
      axios.delete('http://localhost:8080/Cart/cart', {
        id: element.id,
      })
        .then((Response) => {
          console.log(Response);
        }).catch((Err) => {
          console.log(Err);
        })
    })

    setCart([]);
  }



  return (
    <div className="App">
      <div class="header">

        <center> <img src="https://image.freepik.com/free-vector/chinese-food-background-illustrated_52683-68274.jpg" /></center>
      </div>

      <Resturants selectedResturants={selectedResturants} setResturant={setResturant} />
      <center><Products searchProducts={searchProducts} products={products} sortProducts={sortProducts} addToCart={addToCart} /></center>
      <Cart handleClearProducts={handleClearProducts} products={cart} changeQuantity={changeQuantity} />

    </div>
  );

}


export default App;