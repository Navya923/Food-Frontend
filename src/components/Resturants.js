import React from 'react';
import Button from '@mui/material/Button';

const Resturants = ({selectedResturants, setResturant}) =>  {
console.log(selectedResturants)
        const resturants = ['AllProducts','Empire', 'A2B', 'Taj', 'McDonalds'];
    return (
        <div className="resturants">
            <center><h1>TOP RESTURANTS</h1></center>
            <div className="resturant-list">
                {
                    resturants.map((resturant, index) => {
                        return (
                            <Button 
                                className={ "resturant" + (selectedResturants.includes(resturant) ? " selected-resturant" : "")}
                                key={index}
                                onClick={() => setResturant(resturant)}
                            >
                                {resturant}
                            </Button>
                        )
                        
                    })
                }
            </div>
        </div>
    )
}

export default Resturants;
