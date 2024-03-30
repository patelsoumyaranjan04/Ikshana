import React from 'react'
import axios from "axios";
import { useState } from "react";

const Co = () => {

   const [slope, setSlope] = useState("");
   const [TRI, setTRI] = useState("");
   const [TPI, setTPI] = useState("");
   const [Roughness, setRoughness] = useState("");
   const [aspect, setAspect] = useState("");
   const [hillshade, setHillshade] = useState("");

   const [south, setSouth] = useState("");
   const [north, setNorth] = useState("");
   const [west, setWest] = useState("");
   const [east, setEast] = useState("");

   const handleSouth = (e) => {
      setSouth(e.target.value)
   }
   const handleNorth = (e) => {
      setNorth(e.target.value)
   }
   const handleWest = (e) => {
      setWest(e.target.value)
   }
   const handleEast = (e) => {
      setEast(e.target.value)
   }

   const apiCall = () => {
      const data = {
         "south": south,
         "north": north,
         "west": west,
         "east": east
      }
      axios
         .post("API KEY IS NEEDED HERE", data)
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
   }

   return (
      <>
         <div className='form' style={{ border:"1px solid blue", width: "40%", height: "600px", margin: "auto", marginTop: "130px", borderTopLeftRadius: "60px", borderBottomRightRadius: "60px", boxShadow: "2px 2px yellow, 3px 3px aqua "}}>
            <h1 style={{textAlign:"center", position:'relative', top:"20px"}}> Enter Co-ordintes Value</h1>
            <div style={{ position: "relative", top: "100px", left: "80px", fontSize: "27px" }}>
               <label htmlFor="name">Enter South Value : </label>
               <input type='number'
                  style={{
                     padding: "6px",
                     borderRadius: "10px",
                     border: "none",
                     outline: "1px solid white",
                     width: "199px",
                     fontSize: "19px"
                  }}
                  value={south}
                  onChange={handleSouth} />
            </div>

            <div style={{ position: "relative", top: "150px", left: "80px", fontSize: "27px" }}>
               <label htmlFor="name">Enter North Value : </label>
               <input type='number'
                  value={north}
                  onChange={handleNorth}
                  style={{
                     padding: "10px",
                     border: "none",
                     outline: "1px solid white",
                     borderRadius: "10px",
                     width: "190px",
                     fontSize: "19px"
                  }} />
            </div>

            <div style={{ position: "relative", top: "200px", left: "80px", fontSize: "27px" }}>
               <label htmlFor="name">Enter West Value : </label>
               <input type='number'
                  value={west}
                  onChange={handleWest}
                  style={{
                     padding: "10px",
                     border: "none",
                     outline: "1px solid white",
                     borderRadius: "10px",
                     width: "200px",
                     fontSize: "19px"
                  }} />
            </div>

            <div style={{ position: "relative", top: "250px", left: "80px", fontSize: "27px" }}>
               <label htmlFor="name">Enter East Value : </label>
               <input type='number'
                  value={east}
                  onChange={handleEast}
                  style={{
                     padding: "10px",
                     border: "none",
                     outline: "1px solid white",
                     borderRadius: "10px",
                     width: "205px",
                     fontSize: "19px"
                  }} />
            </div>

            <button onClick={apiCall} type='Submit' style={{ marginTop: "50%", padding: "15px", width: "100px", float: "right", marginRight: "50px", borderRadius: "10px", fontFamily: "Cambria, Cochin, Georgia, Times, 'Times New Roman', serif", letterSpacing: "2px", backgroundColor: "aqua", border: "none", cursor: "pointer", outline: "3px solid white", fontSize: "19px" }}>Submit</button>
         </div>

         <div  style={{position:"relative", top:"80px", background:"white", height:"750px", width:"85%", margin:"auto", borderRadius:"10px"}}>

            {slope && <img src={slope} alt="slope" width="430px" style={{position:"relative", left:"50px"}} />}

            {slope ? (<label style={{position:"relative", right:"230px", zIndex:"1",fontSize:"30px", background:"black", color:"white", padding:"10px", borderRadius:"10px", top:"25px"}}>Slope</label>):(<></>)}


            {TRI && <img src={TRI} alt="Displayed" width="430px"  style={{position:"relative", left:"60px"}} />}
            {TRI ? (<label style={{position:"relative", right:"204px", fontSize:"30px", background:"black", color:"white", padding:"10px", borderRadius:"10px", top:"25px"}}>TRI</label>):(<></>)}


            {TPI && <img src={TPI} alt="Displayed" width="430px" style={{position:"relative", left:"170px"}} />} 
            {TPI ? (<label style={{position:"relative", right:"100px", fontSize:"30px", background:"black", color:"white", padding:"10px", borderRadius:"10px", top:"25px", zIndex:"1"}}>TPI</label>):(<></>)}

            {Roughness && <img src={Roughness} alt="Displayed" width="430px" style={{position:"relative", left:"50px"}} />}

            {Roughness ? (<label style={{position:"relative", right:"260px", fontSize:"30px", background:"black", color:"white", padding:"10px", borderRadius:"10px", top:"25px"}}>Roughness</label>):(<></>)}

            {aspect && <img src={aspect} alt="Displayed" width="430px" />}

            {aspect ? (<label style={{position:"relative", right:"290px", fontSize:"30px", background:"black", color:"white", padding:"10px", borderRadius:"10px", top:"25px"}}>Aspect</label>):(<></>)}

            {hillshade && <img src={hillshade} alt="Displayed" width="430px" style={{position:"relative",left:"70px"}} />}
            {hillshade ? (<label style={{position:"relative", left:"1300px", fontSize:"30px", background:"black", color:"white", padding:"10px", borderRadius:"10px", bottom:"5px"}}>HillShade</label>):(<></>)}


         </div>

          {/* <div>
            <h1 style={{ position: "relative", bottom: "150px", left: "200px", padding: "20px", letterSpacing: "3px",  width: "1100px", borderRadius: "7px", background: "white", fontSize: "25px" }}> Graphical Representation of Analysis will show below, Just wait!</h1>
          </div>
           <div style={{ position: "relative", bottom: "50px", height: "690px", padding: "20px", borderRadius: "10px", backgroundColor: "white" }}>

              <div>
                
                {slope && <img src={slope} alt="slope" width="400px" style={{position:"relative", right:"0px"}} />}
                {slope ? (<label style={{position:"relative", right:"290px", fontSize:"30px", background:"black", color:"white", padding:"10px", borderRadius:"10px", top:"25px"}}>Slope</label>):(<></>)}

                { TRI && <img src={TRI} alt="Displayed" width="400px" style={{position:"relative", right:"-50px"}} />}
                {slope ? (<label style={{ position:"relative",right:"210px", fontSize:"30px", background:"black", color:"white", padding:"10px",borderRadius:"10px", top:"25px"}}>TRI</label>):(<></>)}

                {TPI && <img src={TPI} alt="Displayed" width="400px" style={{position:"relative", left:"85px"}} />}
                {slope ? (<label  style={{ position:"relative",right:"180px", fontSize:"30px", background:"black", color:"white", padding:"10px", borderRadius:"10px" , top:"25px"}}>TPI</label>):(<></>)}

                {Roughness && <img src={Roughness} alt="Displayed" width="400px" />}
                {slope ? (<label  style={{ position:"relative",right:"290px", fontSize:"30px", background:"black", color:"white", padding:"10px", borderRadius:"10px", top:"25px"}}>Roughness</label>):(<></>)}

                {aspect && <img src={aspect} alt="Displayed" width="400px" />}
                {slope ? (<label  style={{ position:"relative",right:"270px", fontSize:"30px" , background:"black", color:"white", padding:"10px", borderRadius:"10px" , top:"25px"}}>Aspect</label>):(<></>)}

                {hillshade && <img src={hillshade} alt="Displayed" width="400px" />}
                {slope ? (<label  style={{ position:"relative", left:"500px", top:"-40px", fontSize:"30px", background:"black", color:"white", padding:"10px", borderRadius:"10px", top:"-10px"}}>Hillshade</label>):(<></>)}

              </div>
              </div> */}
      </>
   )
}

export default Co;