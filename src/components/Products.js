import React, {useState} from 'react';

import CardList from './CardList';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const Products = ({products, sortProducts, addToCart}) =>  {

    const [value, setValue] = useState('Select');

    const setList = (e) => {
        setValue(e.target.value);
        sortProducts(e.target.value);
    }
    
    
    return (
        <div className="products">

            <div className="products-nav">
                <h3>PRODUCTS</h3>
                <div className="sort-list">
                    Sort by&nbsp;: &nbsp;
                    <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={value}
                  onChange={setList}
                >
                <MenuItem value="Select">Select</MenuItem>
                <MenuItem value="Highest to Lowest">Highest to Lowest</MenuItem>
                <MenuItem value="Lowest to Highest">Lowest to Highest</MenuItem>
            </Select>
                </div>
            </div>

            <CardList products={products} addToCart={addToCart} />
            
        </div>
    )
}

export default Products;