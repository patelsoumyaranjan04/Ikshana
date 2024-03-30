import React from "react";
import "../css/howworks.css"
import { useState } from "react";
// import Tiff from "tiff.js";
import axios from "axios";
import Loader from "./loader";
import Hand from "../images/hand.svg"

// import Image from '../images/terrain.jpg'

const Analysis = () => {

  const [isLoading, setIsLoading] = useState(true);

  setTimeout(() => {
    setIsLoading(false);
  }, 2000);

  const [file, setFile] = useState();
  const [displayfile, setDisplayfile] = useState();

  const [slope, setSlope] = useState("");
  const [TRI, setTRI] = useState("");
  const [TPI, setTPI] = useState("");
  const [Roughness, setRoughness] = useState("");
  const [aspect, setAspect] = useState("");
  const [hillshade, setHillshade] = useState("");

  const handleFileChange = (e) => {

    const selectedFile = e.target.files[0]
    setFile(selectedFile);

    

    const formData = new FormData();
    formData.append("file", selectedFile);
   
    axios
      .post("API KEY IS NEEDED HERE", formData)
      .then(function (response) {
        const output_image = response.data.image;

        setDisplayfile(`data:image/jpeg;base64,${output_image}`);
      })
      .catch(function (error) {
        console.log(error);
      });

  };

  const GdalAPI = async (e) => {
    e.preventdefault;

    const formData = new FormData();
    formData.append("file", file);

    axios
      .post("API KEY IS NEEDED HERE", formData)
      .then(function (response) {
        const output_image = response.data.image;

        setSlope(`data:image/jpeg;base64,${output_image.slope}`);
        setTRI(`data:image/jpeg;base64,${output_image.TRI}`);
        setTPI(`data:image/jpeg;base64,${output_image.TPI}`);
        setRoughness(`data:image/jpeg;base64,${output_image.Roughness}`);
        setAspect(`data:image/jpeg;base64,${output_image.aspect}`);
        setHillshade(`data:image/jpeg;base64,${output_image.hillshade}`);

      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <>
      <section
        className="terraintext"
        style={{
          textAlign: "center",
          width: "1819px",
          height: "1603px",
          margin: "auto",
          position: "relative",
          top: "15px",
          background: "linear-gradient(white,rgb(241, 204, 136))"


        }}
      >
        <div
          className="labels"
          style={{
            justifyContent:"center",
            alignItems:"center",
            marginLeft:"417px",
            fontSize: "40px",
            width: "750px",
            margin: "auto",
            letterSpacing: "20px",
            background: "transparent",
            border: "none",
          }}
        >
          Analysis System
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
          <h2 htmlFor="name" id="a" style={{ float: "left", position: "relative", left: "0px", color: "black" }}>
            Upload Your Image, Below!
          </h2>
          <div
            className="uploadsec"
            style={{
              position: "relative",
              top: "50px",
              left: "0px",
              width: "500px",
              display: "block",
              height: "300px",
              borderRadius: "10px",
              background: "white",
            }}
          >
            <h1 style={{ color: "Black", letterSpacing: "10px", position: "relative", left: "90px", float: "left" }}>Select File here</h1>
            {/* <p style={{ fontSize: "22px",}}>
              Files Supported: TIFF
            </p> */}
            <br />
            <div>
            <input
              type="file"
              id="fileID"
              style={{ marginLeft: "50px", marginTop: "40px", fontSize: "23px", border: "none", cursor: "pointer", width: "340px", position:"relative", left:"50px", bottom:"5px" }}
              onChange={handleFileChange}
            />
            <img src={Hand} alt="" style={{position:"relative", right:"350px", width:"30px"}} /> </div>
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
                backgroundColor: "aqua",
                color: "black",
                letterSpacing: "2px",
                fontFamily: "Cambria, Cochin, Georgia, Times, 'Times New Roman', serif",
                fontSize: "21px",
                cursor: "pointer",
                marginTop: "60px",


              }}
              onClick={GdalAPI}

            >
              Submit
            </button>
          </div>

          {displayfile ? (
            <img
              src={displayfile}
              alt="images"
              style={{
                display: "block",
                width: "50%",
                height: "300px",
                position: "relative",
                left: "750px",
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
                left: "600px",
                bottom: "250px",
                backgroundColor: "white",
                borderRadius: "10px"
              }}
            >
              <h2 style={{ position: "relative", top: "120px", letterSpacing: "10px" , background:"black", width:"380px", color:"white", margin:"auto", padding:"10px", borderRadius:"10px"}}>No image Selected</h2>
            </div>
          )}

          
          <div style={{ position: "relative", bottom: "50px", height: "690px", padding: "20px", borderRadius: "10px", backgroundColor: "white", marginLeft:"-80px"}}>


            {isLoading ? (
              <div
                style={{
                  width: "100px",
                  margin: "auto",
                  position: "relative",
                  top: "200px",
                }}
              >
                <Loader />
              </div>
            ) : (
              <div>
                
                {slope && <img src={slope} alt="slope" width="400px" style={{position:"relative", right:"0px"}} />}
                {slope ? (<label style={{position:"relative", right:"290px", fontSize:"30px", background:"black", color:"white", padding:"10px", borderRadius:"10px", top:"25px", zIndex:"1"}}>Slope</label>):(<></>)}

                { TRI && <img src={TRI} alt="Displayed" width="400px" style={{position:"relative", right:"-50px"}} />}
                {slope ? (<label style={{ position:"relative",right:"210px", fontSize:"30px", background:"black",  zIndex:"1",color:"white", padding:"10px",borderRadius:"10px", top:"25px"}}>TRI</label>):(<></>)}

                {TPI && <img src={TPI} alt="Displayed" width="400px" style={{position:"relative", left:"85px"}} />}
                {slope ? (<label  style={{ position:"relative",right:"180px", fontSize:"30px", background:"black",  zIndex:'1',color:"white", padding:"10px", borderRadius:"10px" , top:"25px"}}>TPI</label>):(<></>)}

                {Roughness && <img src={Roughness} alt="Displayed" width="400px" style={{position:"relative", left:"85px"}}  />}
                {slope ? (<label  style={{ position:"relative",right:"230px", fontSize:"30px", background:"black", color:"white", padding:"10px", borderRadius:"10px", top:"25px"}}>Roughness</label>):(<></>)}

                {aspect && <img src={aspect} alt="Displayed" width="400px" style={{position:"relative", left:"75px"}}/>}
                {slope ? (<label  style={{ position:"relative",right:"200px", fontSize:"30px" , background:"black", color:"white", padding:"10px", borderRadius:"10px" , top:"25px"}}>Aspect</label>):(<></>)}

                {hillshade && <img src={hillshade} alt="Displayed" width="400px" style={{position:"relative", left:"75px"}}  />}
                {slope ? (<label  style={{ position:"relative", right:"220px", top:"40px", fontSize:"30px", background:"black", color:"white", padding:"10px", borderRadius:"10px"}}>Hillshade</label>):(<></>)}

              </div>
            )}
          </div>

        </div>
      </section>
    </>
  );
};
export default Analysis;
