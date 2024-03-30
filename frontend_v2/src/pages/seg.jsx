import React from 'react'
import uploadss from "../images/upload.svg"
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
const seg = () => {
    const nav = useNavigate();
    const [file, setFile] = useState();

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0]
        setFile(selectedFile);
    };

    const callApi = async (e) => {
        e.preventdefault;

        const formData = new FormData();
        formData.append("file", file);

        axios
            .post("API KEY IS NEEDED HERE", formData)
            .then(function (response) {
                nav("/segresult");
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    return (
        <>
            <div className='left-side' style={{
                width: "45%",
                height: "490px",
                margin: "auto",
                marginTop: "80px",
                borderRadius: "30px",
                background: "linear-gradient(aqua,orange)",
                padding: "25px"
            }}>
                <div style={{
                    background: "white",
                    height: "500px",
                    position: "relative",
                    top: "-5px",
                    borderRadius: "10px"
                }}>
                    <img src={uploadss} alt="" style={{
                        width: "180px",
                        marginLeft: "270px",
                        marginTop: "40px",
                        opacity: "0.7",
                        cursor: "pointer"
                    }} />
                    <label htmlFor="name" style={{
                        letterSpacing: "0px",
                        position: "relative",
                        right: "80px",
                        top: "93px",
                        fontSize: "25px",
                        zIndex:"1",
                        
                    }}>Upload the image here!</label>
                    <input type="file"
                        onChange={handleFileChange}
                        style={{
                            float: "right",
                            position: "relative",
                            top: "45px",
                            right: "350px",
                            padding: "20px",
                            width: "250px",
                            fontSize: "25px",
                            borderRadius: "10px",
                            cursor: "pointer",
                            background: "white",
                            color: "black"
                        }} />
                    <button style={{
                        float: "right",
                        position: "relative",
                        top: "155px",
                        right: "-80px",
                        padding: "20px",
                        width: "230px",
                        fontSize: "25px",
                        borderRadius: "10px",
                        cursor: "pointer",
                        color: "white",
                        background: "black",
                        letterSpacing: "5px"
                    }}
                        onClick={callApi}>Submit</button>
                </div>
            </div>

        </>
    )
}

export default seg;