import React, {useState, useEffect} from "react";
import axios from "axios"

function LibrosForm({id, del, actualizar}){

    if(del !== true)
        del = false

    const[titulo, setTitulo] = useState("")
    const[descripcion, setDescripcion] = useState("")
    const[edicion, setEdicion] = useState("")
    const[isbn, setIsbn] = useState("")
    const[autorId, setAutorId] = useState()
    const[autores, setAutores] = useState()

    useEffect(() =>{
        
        getAutores()
        if(id !== undefined)
            getLibro()
        else{
            setTitulo("")
            setDescripcion("")
            setEdicion("")
            setIsbn("")
            setAutorId("")
            
        }
        
    }, [id])

    



    async function getLibro(){
        try{
            let res = await axios("https://denny2023.azurewebsites.net/api/libros/"+id)
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
                document.querySelector("#btnCancelar").click()
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
            if(id === undefined)
                guardar()
            else if(del !== true)
                editar()
            else
                eliminar()
        }
    }

    async function eliminar(){
        try{
            let res = await axios.delete("https://denny2023.azurewebsites.net/api/libros?id="+id)
            let data = await res.data

            alert(data.message)

            if(data.status === 1){
                document.querySelector("#btnCancelar").click()
                actualizar()
            }
        }
        catch(error){
            alert(error)

            if(error.response.status === 404)
                document.querySelector("#btnCancelar").click()
        }
    }

    async function editar(){
        try{
            let libro = {
                libroId: id,
                titulo: titulo,
                descripcion: descripcion,
                edicion: edicion,
                isbn: isbn,
                autorId: autorId
            }
            let res = await axios.put("https://denny2023.azurewebsites.net/api/libros", libro)
            let data = res.data

            alert(data.message)

            if(data.status === 1){
                document.querySelector("#btnCancelar").click()
                actualizar()
            }
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

            if(data.status === 1){
                document.querySelector("#btnCancelar").click()
                actualizar()
            }
                
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

    function cancelar(e){
        e.preventDefault()
        e.stopPropagation()
        let form = document.querySelector("#formulario")
        form.classList.remove('was-validated')
    }

    return(
        <div>
            <form id="formulario" className="needs-validation" noValidate>
                {
                    id !== undefined ?
                    <div className="form-group mb-3">
                        <label className="form-label">ID:</label>
                        <input className="form-control" type="text" value={id} readOnly disabled />
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
                            autores !== undefined ?
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
                <div className='modal-footer form-group mb-3'>
                    <input onClick={(e) => enviar(e)} type="submit" className={`btn btn-${id === undefined ? "success" : del===true ? "danger" : "primary"}`} value={id === undefined ? "Guardar" : del===true ? "Eliminar" : "Editar"} />
                    <button id="btnCancelar" data-bs-dismiss="modal" onClick={(e) => cancelar(e)} className='btn btn-warning'>Cancelar</button>
                </div>
            </form>
        </div>
    )
}

export default LibrosForm