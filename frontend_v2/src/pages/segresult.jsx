import React from 'react'
import { useState, useEffect } from "react";
import axios from "axios";
import Bg from "../images/bg.jpg"
const segresult = () => {
     const bgs = {
        backgroundImage:`url(${Bg})`
     }
    const [displayfile, setDisplayfile] = useState();
    useEffect(() => {
        axios
            .post("API KEY IS NEEDED HERE")
            .then(function (response) {
                const output_image = response.data.image;

                setDisplayfile(`data:image/jpeg;base64,${output_image}`);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);

    return (
        <center>
        <div style={bgs}>
            {displayfile && <img src={displayfile} alt="Displayed" style={{background:"none"}} />}
        </div></center>
    )
}

export default segresult;
