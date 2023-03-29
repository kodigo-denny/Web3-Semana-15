import React, {useEffect, useState} from 'react'
import Menu from './Menu'
import { useNavigate, useParams } from 'react-router-dom'
import axios from "axios"

const AutoresForm = ({del}) => {

    let p = useParams()

    console.log(p.id)

    const[nombre, setNombre] = useState("")
    const[apellido, setApellido] = useState("")
    const[pais, setPais] = useState("")

    const navigate = useNavigate()

    useEffect(() => {
        if(del != true)
            del = false

        if(p.id != undefined)
            cargarAutor()
    }, [])

    async function cargarAutor(){
        try{
            let res = await axios("https://denny2023.azurewebsites.net/api/autores/"+p.id)
            let data = await res.data



            setNombre(data.nombre)
            setApellido(data.apellido)
            setPais(data.paisOrigen)

        }
        catch(error){
            alert(error)
            if(error.response.status === 404)
                navigate("/autores")
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
            else if(del === false)
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
            let res = await axios.delete("https://denny2023.azurewebsites.net/api/autores?id=" + p.id)
            let data = await res.data

            alert(data.message)

            if(data.status === 1)
                navigate("/autores")
        }
        catch(error){
            alert(error)
            if(error.response.status === 404)
                navigate("/autores")
        }
    }

    async function editar(){
        try{
            const autor =
            {
                autorId: p.id,
                nombre: nombre,
                apellido: apellido,
                paisOrigen: pais
            }

            let res = await axios.put("https://denny2023.azurewebsites.net/api/autores", autor)
            let data = await res.data

            alert(data.message)

            if(data.status === 1)
                navigate("/autores")

        }
        catch(error){
            alert(error)
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

            if(datos.status === 1)
                document.querySelector("#btnCancelar").click()

        }
        catch(error){
            alert(error)
        }
    }

    function cancelar(e){
        e.preventDefault()
        e.stopPropagation()
    }

  return (
    <div>
        <form id="formulario" className='needs-validation' noValidate>
            {
                p.id != undefined ?
                <div className='form-group mb-3'>
                    <label className='form-label'>ID:</label>
                    <input type="text" value={p.id} readOnly disabled className="form-control" />
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
            <div className='form-group mb-3'>
                <input onClick={(e) => enviar(e)} type="submit" className={`btn btn-${p.id === undefined ? "success" : del===true ? "danger" : "primary"}`} value={p.id === undefined ? "Guardar" : del===true ? "Eliminar" : "Editar"} />
                <button id="btnCancelar" data-bs-dismiss="modal" onClick={(e) => cancelar(e)} className='btn btn-warning'>Cancelar</button>
            </div>
        </form>
        
    </div>
  )
}

export default AutoresForm