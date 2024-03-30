import React from "react";
import "../css/howworks.css"
import { useState } from "react";
// import Tiff from "tiff.js";
import axios from "axios";
import Loader from "./loader";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLocation } from 'react-router-dom';

// import Image from '../images/terrain.jpg'

const Recog2 = () => {

  const [isLoading, setIsLoading] = useState(true);

  setTimeout(() => {
    setIsLoading(false);
  }, 2000);

  const [file, setFile] = useState();
  const [displayfile, setDisplayfile] = useState();

  const location = useLocation();
  const api = new URLSearchParams(location.search).get('data');


  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]
    setDisplayfile(URL.createObjectURL(selectedFile))
    setFile(selectedFile);
  };

  const callApi = async (e) => {
    e.preventdefault;

    const formData = new FormData();
    formData.append("file", file);

    axios
      .post(`API KEY IS NEEDED HERE ${api}`, formData)
      .then(function (response) {
        toast.success(response.data.output,{position: toast.POSITION.TOP_CENTER})
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <>
    <ToastContainer />
      <section
        className="terraintext"
        style={{
          textAlign: "center",
          width: "1519px",
          height: "650px",
          margin: "auto",
          position: "relative",
          top: "15px",
          background: "linear-gradient(white,rgb(241, 204, 136))"


        }}
      >
        <div
          className="labels"
          style={{
            position: "relative",
            top: "50px",
            fontSize: "40px",
            width: "750px",
            margin: "auto",
            letterSpacing: "20px",
            borderRadius: "10px",
            background: "transparent",
            border: "none",
          }}
        >
          Recognition System
        </div>
        <div
          className="fileupload"
          style={{
            // border: "2px dotted black",
            width: "90%",
            height: "440px",
            margin: "auto",
            marginTop: "90px",
          }}
        >
          <h2 htmlFor="name" id="a" style={{ float: "left", position: "relative", left: "70px", color: "black" }}>
            Upload Your Image, Below!
          </h2>
          <div
            className="uploadsec"
            style={{
              position: "relative",
              top: "50px",
              left: "60px",
              width: "500px",
              display: "block",
              height: "300px",
              borderRadius: "10px",
              background: "white",
            }}
          >
            <h1 style={{ color: "Black", letterSpacing: "10px", position: "relative", left: "40px", float: "left" }}>Select File here</h1>
            <br />
            <input
              type="file"
              id="fileID"
              style={{ marginLeft: "-90px", marginTop: "50px", fontSize: "23px", border: "none", cursor: "pointer", width: "340px" }}
              onChange={handleFileChange}
            />
            <br />
            <button
              className="btn"
              id="btnclc"
              style={{
                marginLeft: "270px",
                padding: "15px",
                borderRadius: "6px",
                width: "30%",
                border: "1px solid white",
                background: "black",
                color: "white",
                letterSpacing: "2px",
                fontFamily: "Cambria, Cochin, Georgia, Times, 'Times New Roman', serif",
                fontSize: "21px",
                cursor: "pointer",
                marginTop: "90px",


              }}
              onClick={callApi}

            >
              Submit
            </button>
          </div>

          {displayfile ? (
            <img
              src={displayfile}
              alt="images"
              style={{
                border: "1px solid black",
                display: "block",
                width: "50%",
                height: "300px",
                position: "relative",
                left: "650px",
                bottom: "250px",
                borderRadius: "10px"
              }}
            ></img>

          ) : (
            <div
              style={{

                display: "block",
                width: "50%",
                height: "300px",
                position: "relative",
                left: "650px",
                bottom: "250px",
                backgroundColor: "white",
                borderRadius: "10px"
              }}
            >
              <h2 style={{ position: "relative", top: "120px", letterSpacing: "10px" }}>No image Selected</h2>
            </div>
          )}

          {/* <div>
            <h1 style={{position:"relative", bottom:"150px",left:"100px" ,padding:"20px", letterSpacing:"1px", border:"1px solid black", width:"1100px", borderRadius:"7px", background:"white", fontSize:"25px"}}> Slope, TRI, TPI , Roughness, Aspect , Hillshade Images will show below, Just wait!</h1>             
          </div>
          <div style={{position:"relative", bottom:"90px", border:"1px solid black", height:"550px", padding:"20px", borderRadius:"10px", backgroundColor:"white"}}>
          

           {isLoading ? (
                <div
                    style={{
                        width: "100px",
                        margin: "auto",
                        position:"relative",
                        top:"200px"
                    }}
                >
                    <Loader />
                </div>
            ) : (
                <div>
                    
            {slope && <img src={slope} alt="slope" width="350px"  />}

            {slope && <img src={TRI} alt="Displayed" width="350px"  />}

            {TPI && <img src={TPI} alt="Displayed" width="350px"  />}

            {Roughness && <img src={Roughness} alt="Displayed" width="350px" />}

            {aspect && <img src={aspect} alt="Displayed" width="350px" />}

            {hillshade && <img src={hillshade} alt="Displayed"width="350px"/>}
  
                </div>
            )} */}
          {/* </div> */}

        </div>
      </section>
    </>
  );
};
export default Recog2;
