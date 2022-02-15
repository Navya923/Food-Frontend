import React, { useEffect, useState } from 'react';

import CardList from './CardList';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import SearchBar from "material-ui-search-bar";
const Products = ({ products, sortProducts, addToCart, searchProducts }) => {

    const [value, setValue] = useState('Select');
    const [sortedProducts,setSortedProducts]=useState(products);

    const setList = (e) => {
        setValue(e.target.value);
        sortProducts(e.target.value);
    }
    const handleChange=(e)=>{
        searchProducts(e);
    }
    useEffect(()=>{
        let sorted=products.sort((x,y)=>{
            return (x.topPick === y.topPick)? 0 : x.topPick? -1 : 1;
        })
        console.log('sorted',sorted);
        setSortedProducts(sorted);
    })

    return (
        <div className="products">

            <div className="products-nav">
                <SearchBar
                    value={''}
                    onChange={handleChange}
                /><br/>
                <div className="sort-list">
                    Sort by&nbsp;: &nbsp;
                    <Select
                        value={value}
                        onChange={setList}
                    >
                        <MenuItem value="Select">Select</MenuItem><br/>
                        <MenuItem value="Highest to Lowest">Highest to Lowest</MenuItem><br/>
                        <MenuItem value="Lowest to Highest">Lowest to Highest</MenuItem><br/>
                    </Select>
                </div>
            </div>

            <CardList products={sortedProducts} addToCart={addToCart} />

        </div>
    )
}

export default Products;