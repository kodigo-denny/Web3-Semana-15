import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import Menu from './Menu'
import Tabla from './Tabla'
import axios from "axios"

const AutoresCrud = () => {

    const[autores, setAutores] = useState()

    useEffect(() =>{
        cargarAutores()
    }, [])

    async function cargarAutores(){
        try{
            let res = await axios("https://denny2023.azurewebsites.net/api/autores")
            let lista = await res.data

            setAutores(lista)
        }
        catch(error){
            alert(error)
            console.log(error)
        }
    }

  return (
    <div>
        <Menu />
        
        {
            autores == undefined ?
            <div>
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                <h2>Cargando...</h2>
            </div>
            :
            <Tabla controlador="autores" lista={autores} cols={["Autor ID", "Nombre", "Apellido", "País de origen"]} />
        }
        
    </div>
  )
}

export default AutoresCrud