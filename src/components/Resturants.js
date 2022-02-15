import React from 'react';
import Button from '@mui/material/Button';

const Resturants = ({ selectedResturants, setResturant }) => {
    const resturants =
        [
            {
                "id": 0,
                "name": "AllProducts"
            },
            {
                "id": 1,
                "name": "Empire"
            },
            {
                "id": 2,
                "name": "Taj"
            },
            {
                "id": 3,
                "name": "McDonalds"
            },
            {
                "id": 4,
                "name": "A2B"
            }
        ]
    return (
        <div className="resturants">
            <center><h1>TOP RESTURANTS</h1></center>
            <div className="resturant-list">
                {
                    resturants.map((resturant, index) => {
                        return (
                            <Button
                                className={"resturant" + (selectedResturants.includes(resturant.name) ? " selected-resturant" : "")}
                                key={index}
                                onClick={() => setResturant(resturant)}
                            >
                                {resturant.name}
                            </Button>
                        )

                    })
                }
            </div>
        </div>
    )
}

export default Resturants;

