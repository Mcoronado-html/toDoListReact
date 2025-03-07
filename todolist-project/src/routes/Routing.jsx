import React from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from "../pages/Home"
import Login from "../pages/Login"
import Register from "../pages/Register"


function Routing() {
  return (
    <div>
      <Router>
        <Routes>
<Route path="/Home" element={<Home/>}/>
<Route path="/Login" element={<Login/>}/>
<Route path="/Register" element={<Register/>}/>             
        </Routes>
      </Router>
    </div>
  );
}
export default Routing