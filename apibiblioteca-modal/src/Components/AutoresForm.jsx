import React, {useEffect, useState} from 'react'
import axios from "axios"

const AutoresForm = ({id, del, actualizar}) => {

    if(del !== true)
            del = false

    const[nombre, setNombre] = useState("")
    const[apellido, setApellido] = useState("")
    const[pais, setPais] = useState("")

    useEffect(() => {
        

        if(id !== undefined)
            cargarAutor()
        else{
            setNombre("")
            setApellido("")
            setPais("")
        }
    }, [id])

    async function cargarAutor(){
        try{
            let res = await axios("https://denny2023.azurewebsites.net/api/autores/"+id)
            let data = await res.data



            setNombre(data.nombre)
            setApellido(data.apellido)
            setPais(data.paisOrigen)

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
            else{
                let respuesta = window.confirm("Esta seguro que desea eliminar?")
                
                if(respuesta === true)
                    eliminar()
            }
                
        }
        
    }

    async function eliminar(){
        try{
            let res = await axios.delete("https://denny2023.azurewebsites.net/api/autores?id=" + id)
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
            const autor =
            {
                autorId: id,
                nombre: nombre,
                apellido: apellido,
                paisOrigen: pais
            }

            let res = await axios.put("https://denny2023.azurewebsites.net/api/autores", autor)
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

    async function guardar(){
        try{
            const autor =
            {
                nombre: nombre,
                apellido: apellido,
                paisOrigen: pais
            }

            let res = await axios.post("https://denny2023.azurewebsites.net/api/autores", autor)
            let datos = res.data

            alert(datos.message)

            if(datos.status === 1){
                document.querySelector("#btnCancelar").click()
                actualizar()
            }
                

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

  return (
    <div>
        <form id="formulario" className='needs-validation' noValidate>
            {
                id !== undefined ?
                <div className='form-group mb-3'>
                    <label className='form-label'>ID:</label>
                    <input type="text" value={id} readOnly disabled className="form-control" />
                </div>
                :
                ""
            }
            

            <div className='form-group mb-3'>
                <label className='form-label'>Nombre:</label>
                <input required type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} className="form-control" disabled={del} placeholder="Ingrese un nombre" />
                <div className="valid-feedback">Correcto</div>
                <div className="invalid-feedback">Complete el campo</div>
            </div>
            <div className='form-group mb-3'>
                <label className='form-label'>Apellido:</label>
                <input required type="text" value={apellido} onChange={(e) => setApellido(e.target.value)} className="form-control" disabled={del} placeholder="Ingrese un apellido" />
                <div className="valid-feedback">Correcto</div>
                <div className="invalid-feedback">Complete el campo</div>
            </div>
            <div className='form-group mb-3'>
                <label className='form-label'>Pais:</label>
                <input required type="text" value={pais} onChange={(e) => setPais(e.target.value)} className="form-control" disabled={del} placeholder="Ingrese un pais" />
                <div className="valid-feedback">Correcto</div>
                <div className="invalid-feedback">Complete el campo</div>
            </div>
            <div className='modal-footer form-group mb-3'>
                <input onClick={(e) => enviar(e)} type="submit" className={`btn btn-${id === undefined ? "success" : del===true ? "danger" : "primary"}`} value={id === undefined ? "Guardar" : del===true ? "Eliminar" : "Editar"} />
                <button id="btnCancelar" data-bs-dismiss="modal" onClick={(e) => cancelar(e)} className='btn btn-warning'>Cancelar</button>
            </div>
        </form>
        
    </div>
  )
}

export default AutoresForm