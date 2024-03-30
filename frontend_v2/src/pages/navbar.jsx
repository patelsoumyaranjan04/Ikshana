import React from 'react'
import { NavLink } from 'react-router-dom';
import '../css/navbar.css'
import ik from "../images/IKSHANA.svg"

const navbar = () => {
  return (
    <>
    <header>
   <div className='navbar' style={{backgroundColor:"white"}}>
    <div className='insidenav' style={{fontSize:"30px", marginLeft:"50px", marginTop:"10px", color:"black"}}> <img src={ik} alt="" width="30px" style={{borderRadius:"10px", position:"relative", right:"30px", top:"4px"}}/>IKSHANA</div>
    <nav>
        <ul>
            <li><NavLink to='/' style={{textDecoration:"none", fontSize:"18px", color:"white",  padding:"7px", borderRadius:"8px", backgroundColor:"black"}}>Home</NavLink></li>
            {/* <li><NavLink to='/about' style={{textDecoration:"none",fontSize:"18px",color:"white",  padding:"7px", borderRadius:"8px", backgroundColor:"black"}}>About</NavLink></li> */}
            <li><NavLink to='/upload' style={{textDecoration:"none",fontSize:"18px", color:"white",  padding:"7px", borderRadius:"8px", backgroundColor:"black"}} >Analysis</NavLink></li>
            <li><NavLink to='/recognition' style={{textDecoration:"none",fontSize:"18px", color:"white", padding:"7px", borderRadius:"8px", backgroundColor:"black"}}>Recognition</NavLink></li>
            <li><NavLink to='/seg' style={{textDecoration:"none",fontSize:"18px", color:"white", padding:"7px", borderRadius:"8px", backgroundColor:"black"}}>Segmentation</NavLink></li>

        </ul>
        </nav>
    </div>
    </header>
    </>
  )
}


export default navbar;
