import React, {useState, useEffect} from "react";
import Menu from "./Menu";
import axios from "axios"
import { useNavigate, useParams } from "react-router-dom";

function LibrosForm({del}){

    const[titulo, setTitulo] = useState("")
    const[descripcion, setDescripcion] = useState("")
    const[edicion, setEdicion] = useState("")
    const[isbn, setIsbn] = useState("")
    const[autorId, setAutorId] = useState()
    const[autores, setAutores] = useState()

    const navigate = useNavigate()
    const p = useParams()

    useEffect(() =>{
        getAutores()
        if(p.id != undefined)
            getLibro()
        if(del != true)
            del = false
    }, [])

    /*
    useEffect(() =>{
        console.log(autorId)
    }, [autorId])
*/

    async function getLibro(){
        try{
            let res = await axios("https://denny2023.azurewebsites.net/api/libros/"+p.id)
            let data = res.data

            setTitulo(data.titulo)
            setDescripcion(data.descripcion)
            setEdicion(data.edicion)
            setIsbn(data.isbn)
            setAutorId(data.autorId)
        }
        catch(error){
            alert(error)
            if(error.response.status === 404)
                navigate("/libros")
        }
    }

    function enviar(e){
        let form = document.querySelector("#formulario")

        e.preventDefault()
        e.stopPropagation()

        if(!form.checkValidity()){

            form.classList.add('was-validated')
        }
        else{
            if(p.id === undefined)
                guardar()
            else if(del != true)
                editar()
            else
                eliminar()
        }
    }

    async function eliminar(){
        try{
            let res = await axios.delete("https://denny2023.azurewebsites.net/api/libros?id="+p.id)
            let data = await res.data

            alert(data.message)

            if(data.status === 1)
                navigate("/libros")
        }
        catch(error){
            alert(error)

            if(error.response.status === 404)
                navigate("/libros")
        }
    }

    async function editar(){
        try{
            let libro = {
                libroId: p.id,
                titulo: titulo,
                descripcion: descripcion,
                edicion: edicion,
                isbn: isbn,
                autorId: autorId
            }
            let res = await axios.put("https://denny2023.azurewebsites.net/api/libros", libro)
            let data = res.data

            alert(data.message)

            if(data.status === 1)
                navigate("/libros")
        }
        catch(error){
            alert(error)
        }
    }

    async function guardar(){
        try{
            let libro = {
                titulo: titulo,
                descripcion: descripcion,
                edicion: edicion,
                isbn: isbn,
                autorId: autorId
              }

            let res = await axios.post("https://denny2023.azurewebsites.net/api/libros", libro)
            let data = await res.data

            alert(data.message)

            if(data.status === 1)
              navigate("/libros")
        }
        catch(error){
            alert(error)
        }
    }

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
            <form id="formulario" className="needs-validation" noValidate>
                {
                    p.id != undefined ?
                    <div className="form-group mb-3">
                        <label className="form-label">ID:</label>
                        <input className="form-control" type="text" value={p.id} readOnly disabled />
                    </div>
                    :
                    ""
                }
                
                <div className="form-group mb-3">
                    <label className="form-label">Titulo</label>
                    <input className="form-control" required type="text" disabled={del} value={titulo} onChange={(e) => setTitulo(e.target.value)} placeholder="Ingrese el titulo del libro" />
                    <div className="valid-feedback">Correcto</div>
                <div className="invalid-feedback">Complete el campo</div>
                </div>
                <div className="form-group mb-3">
                    <label className="form-label">Descripción</label>
                    <input className="form-control" required type="text" disabled={del} value={descripcion} onChange={(e) => setDescripcion(e.target.value)} placeholder="Ingrese la descripción" />
                    <div className="valid-feedback">Correcto</div>
                <div className="invalid-feedback">Complete el campo</div>
                </div>
                <div className="form-group mb-3">
                    <label className="form-label">Edición</label>
                    <input className="form-control" required type="text" disabled={del} value={edicion} onChange={(e) => setEdicion(e.target.value)}  placeholder="Ingrese la edición del libro" />
                    <div className="valid-feedback">Correcto</div>
                    <div className="invalid-feedback">Complete el campo</div>
                </div>
                <div className="form-group mb-3">
                    <label className="form-label">ISBN</label>
                    <input className="form-control" required type="text" disabled={del} value={isbn} onChange={(e) => setIsbn(e.target.value)}  placeholder="Ingrese el ISBN" />
                    <div className="valid-feedback">Correcto</div>
                    <div className="invalid-feedback">Complete el campo</div>
                </div>
                <div className="form-group mb-3">
                    <label className="form-label">Autor</label>
                    <select value={autorId} required disabled={del} onChange={(e) => setAutorId(e.target.value)} className="form-select">
                        <option value="">No seleccionado</option>
                        {
                            autores != undefined ?
                                autores.map((value, index) =>{
                                    return <option value={value.autorId} key={value.autorId}>{value.nombre} {value.apellido}</option>
                                })
                            :
                                ""
                        }
                    </select>
                    <div className="valid-feedback">Correcto</div>
                    <div className="invalid-feedback">Seleccione un autor</div>
                </div>
                <div className="form-group">
                    <input type="submit" onClick={(e) => enviar(e)} className={`btn btn-${p.id === undefined ? "success" : del === true ? "danger" : "primary"}`} value={p.id === undefined ? "Guardar" : del === true ? "Eliminar" : "Editar"} />
                    <button className="btn btn-warning" onClick={() => navigate("/libros")}>Cancelar</button>
                </div>
            </form>
        </div>
    )
}

export default LibrosForm