import React, {useState, useEffect} from "react";
import Menu from "./Menu";
import axios from "axios"

function LibrosForm(){

    const[titulo, setTitulo] = useState("")
    const[descripcion, setDescripcion] = useState("")
    const[edicion, setEdicion] = useState("")
    const[isbn, setIsbn] = useState("")
    const[autorId, setAutorId] = useState(0)
    const[autores, setAutores] = useState()

    useEffect(() =>{
        getAutores()
    }, [])

    useEffect(() => {
        console.log(autores)
    }, [autores])

    async function getAutores(){
        try{
            let res = await axios("https://denny2023.azurewebsites.net/api/autores")
            let data = await res.data

            setAutores(data)
        }
        catch(error){
            alert(error)
        }
    }

    return(
        <div>
            <Menu />
            <form id="formulario">
                <div className="form-group mb-3">
                    <label className="form-label">Titulo</label>
                    <input className="form-control" type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)} placeholder="Ingrese el titulo del libro" />
                </div>
                <div className="form-group mb-3">
                    <label className="form-label">Descripción</label>
                    <input className="form-control" type="text" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} placeholder="Ingrese la descripción" />
                </div>
                <div className="form-group mb-3">
                    <label className="form-label">Edición</label>
                    <input className="form-control" type="text" value={edicion} onChange={(e) => setEdicion(e.target.value)}  placeholder="Ingrese la edición del libro" />
                </div>
                <div className="form-group mb-3">
                    <label className="form-label">ISBN</label>
                    <input className="form-control" type="text" value={isbn} onChange={(e) => setIsbn(e.target.value)}  placeholder="Ingrese el ISBN" />
                </div>
                <div className="form-group mb-3">
                    <label className="form-label">Autor</label>
                    <select className="form-select">
                        <option>No seleccionado</option>
                        {
                            autores != undefined ?
                                autores.map((value, index) =>{
                                    return <option value={value.autorId} key={value.autorId}>{value.nombre} {value.apellido}</option>
                                })
                            :
                                ""
                        }
                    </select>
                </div>
            </form>
        </div>
    )
}

export default LibrosForm