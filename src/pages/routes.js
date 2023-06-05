import React from "react";
import { Route,Routes, BrowserRouter } from "react-router-dom";

import Home from "./home";
import Login from "./login";


const Rotas = () => {
   return(
       <BrowserRouter>
        <Routes>
        <Route path="/" element={<Login />} />
        <Route exact path="/Home" element={<Home />} />
        </Routes>
       </BrowserRouter>
   )
}

export default Rotas;