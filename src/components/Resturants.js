import React from 'react';
import Button from '@mui/material/Button';

const Resturants = ({selectedResturants, setResturant}) =>  {
console.log(selectedResturants)
    const resturants = ['EMPIRE', 'ATRIA', 'A2B', 'CITRUS'];
    return (
        <div className="resturants">
            <h3>RESTURANTS</h3>
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
