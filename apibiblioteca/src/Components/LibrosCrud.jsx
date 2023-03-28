import React, {useState, useEffect} from 'react'
import Menu from './Menu'
import axios from "axios"
import Tabla from './Tabla'

const LibrosCrud = () => {
  
  const[libros, setLibros] = useState()

  useEffect(() => {
    cargarLibros()
  }, [])

  async function cargarLibros(){
    try{
      let res = await axios("https://denny2023.azurewebsites.net/api/libros")
      let data = await res.data

      setLibros(data)
    }
    catch(error){
      alert(error)
    }
  }

  return (
    <div>
        <Menu />
        {
          libros === undefined ?
          <div>
            <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
            <h2>Cargando...</h2>
          </div>
          :
          <Tabla lista={libros} controlador="libros" cols={["Libro ID", "Titulo", "Descripcion", "Edición", "ISBN", "Autor ID", "Nombre", "Apellido"]} />
        }
        
    </div>
  )
}

export default LibrosCrud