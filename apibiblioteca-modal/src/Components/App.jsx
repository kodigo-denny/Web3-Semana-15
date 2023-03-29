import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AutoresCrud from "./AutoresCrud";
import AutoresForm from "./AutoresForm";
import Home from "./Home";
import LibrosCrud from "./LibrosCrud";
import LibrosForm from "./LibrosForm";
import NotFound from "./NotFound";

function App(){

    

    return(
        
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/autores" element={<AutoresCrud />} />
                <Route path="/libros" element={<LibrosCrud />} />
                <Route path="*" element={<NotFound />} />

            </Routes>
        </BrowserRouter>
    )
}

export default App