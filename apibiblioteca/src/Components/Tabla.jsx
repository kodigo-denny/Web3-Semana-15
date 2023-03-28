import React, {useEffect} from 'react'
import { Link } from 'react-router-dom'

const Tabla = ({cols, controlador, lista}) => {

    /*
    useEffect(() => {
        //console.log(lista)

        console.log(Object.values(lista[0]))
    }, [])*/

  return (
    <div>
        <table className='table table-striped'>
            <thead>
                <tr>
                    <th>
                        <Link to={`/${controlador}/new`} className='btn btn-success'>Nuevo</Link>
                    </th>
                    {
                        cols.map((value, index) =>{
                            return <th key={index}>{value}</th>
                        })
                    }
                </tr>
            </thead>
            <tbody>
                {
                    lista.map((value, index) => {
                        return <tr key={index}>
                            <td>
                                <Link to={`/${controlador}/edit/${Object.values(value)[0]}`} className='btn btn-primary'>Editar</Link>
                                <Link to={`/${controlador}/delete/${Object.values(value)[0]}`} className='btn btn-danger'>Eliminar</Link>
                            </td>
                            {Object.values(value).map((value2, index2) => {
                                return <td key={index2}>{value2}</td>
                            })}
                        </tr>
                    })
                }
            </tbody>
        </table>
    </div>
  )
}

export default Tabla