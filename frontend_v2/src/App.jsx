import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import Recognition from './pages/Recognition';
import Upload from "../src/pages/Upload";
import Navbar from './pages/navbar';
import Analysis from "../src/pages/Analysis"
import Recog from "../src/pages/Recog2"
import Co from "../src/pages/Co";
import Seg from "../src/pages/seg"
import Segresult from './pages/segresult';
 const App = () => {
  return (
    <>
    <Router>
    <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        {/* <Route path='/about' element={<About/>}/> */}
        <Route path='/analysis' element={<Analysis/>}/>
        <Route path='/recognition' element={<Recognition/>}/>
        <Route path='/upload' element={<Upload/>}/>
        <Route path='/Co' element={<Co/>}/>
        <Route path='/recog' element={<Recog/>}/>
        <Route path='/seg' element={<Seg/>}/>
        <Route path='/segresult' element={<Segresult/>}/>



      </Routes>
    </Router>
    
    </>
  )
}

export default App;