import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import Menu from './Menu'
import Tabla from './Tabla'
import axios from "axios"
import AutoresForm from './AutoresForm'

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
        

        <div className="modal fade" id="autoresModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-content">
            <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">Formulario Autor</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
                <AutoresForm />
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary">Save changes</button>
            </div>
            </div>
        </div>
        </div>
    </div>
  )
}

export default AutoresCrud