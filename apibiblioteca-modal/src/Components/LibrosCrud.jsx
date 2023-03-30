import React, {useState, useEffect} from 'react'
import Menu from './Menu'
import axios from "axios"
import Tabla from './Tabla'
import LibrosForm from "./LibrosForm"

const LibrosCrud = () => {
  
  const[libros, setLibros] = useState()
  const[id, setId] = useState()
  const[del, setDel] = useState()

  function configurar(id, del){
    setId(id)
    setDel(del)
  }

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
          <Tabla lista={libros} evento={configurar} controlador="libros" cols={["Libro ID", "Titulo", "Descripcion", "Edición", "ISBN", "Autor ID", "Nombre", "Apellido"]} />
        }

        <div className="modal fade" id="librosModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
              <div className="modal-content">
              <div className="modal-header">
                  <h1 className="modal-title fs-5" id="exampleModalLabel">Formulario Libro</h1>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                  <LibrosForm Form id={id} del={del} actualizar={cargarLibros} />
              </div>
              </div>
          </div>
        </div>
        
    </div>
  )
}

export default LibrosCrud