import React from 'react'
import img from '../images/upload.svg'
import co from '../images/co.svg'
import {NavLink} from 'react-router-dom'
 const Upload = () => {

  return (
    <>
    <section className='middle' style={{position:"relative", height:"400px", top:"90px", width:"1200px", margin:"auto", borderRadius:"10px", background: "linear-gradient(aqua,orange)"}}>
         
          
          <button style={{padding:"160px", position:"relative", right:"-60px", borderRadius:"10px", outline:"1px solid white", border:"none", top:"40px", width:"500px", height:"300px"}}>
          <label style={{position:"relative", top:"100px", left:"-50px", fontSize:"16px"}}>Upload image here!</label>
          <img src={img} alt="" style={{width:"100px", position:"relative", left:"40px", bottom:"100px"}} />
          {/* <label htmlFor="name" style={{position:"relative", top:"0px", letterSpacing:"5px", fontSize:"20px", right:"50px",}}>Upload file here!</label> */}
          <NavLink to="/analysis" style={{textDecoration:"none"}}><button style={{position:"relative", top:"-5px", padding:"10px", right:"-40px", borderRadius:"10px", cursor:"pointer", color:"white", background:"black"}}>Click Me!</button></NavLink>
          </button>

          <button style={{padding:"160px", position:"relative", right:"-130px", borderRadius:"10px", outline:"1px solid white", border:"none", top:"40px", width:"500px", height:"300px"}}>
          <label style={{position:"relative", top:"100px", left:"-60px", fontSize:"16px", display:"block"}}>Enter Co-ordinates here!!</label>
          <img src={co} alt="" style={{width:"100px", position:"relative", left:"40px", bottom:"100px"}} />
          {/* <label htmlFor="name" style={{position:"relative", top:"0px", letterSpacing:"5px", fontSize:"20px", right:"50px",}}>Upload file here!</label> */}
          <NavLink to="/Co" style={{textDecoration:"none"}}><button style={{position:"relative", top:"-5px", padding:"10px", right:"-40px", borderRadius:"10px", cursor:"pointer", color:"white", background:"black"}}>Click Me!</button></NavLink>
          </button>




    </section>
    </>
  );
};

export default Upload;