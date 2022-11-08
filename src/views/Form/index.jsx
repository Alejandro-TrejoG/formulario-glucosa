import React from 'react'
import Swal from 'sweetalert2'
import FormImg from "../../assets/undraw_forming_ideas_re_2afc.svg"
import "./Form.css"

const Form = () => {

    const [nombre, setNombre] = React.useState("")
    const [tipoMuestra, setTipoMuestra] = React.useState("")
    const [concentracionG, setConcentracion] = React.useState(null)
    const [correo, setCorreo] = React.useState("")

    const verificacionCamposLlenos = () => {
        if (nombre !== "" && tipoMuestra !== "" && concentracionG !== null && correo !== "") {
            enviarDatos()
        } else {
            Swal.fire({
                icon: "warning",
                title: "Whops!",
                text: "Hay campos que se encuentran vacios",
                timer: 1500,
                showConfirmButton: false
            })
        }
    }

    const enviarDatos = async () => {
        const objInfo = {
            correo: correo,
            nombre: nombre,
            tipoMuestra: tipoMuestra,
            concentracion: concentracionG
        }
        const response = await fetch("https://api-glucosa.herokuapp.com/api/send-mail",
            {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(objInfo)
            }
        );
        if (response.status === 201) {
            Swal.fire({
                icon: "success",
                title: "¡Excelente!",
                text: "El correo ha sido enviado",
                showConfirmButton: false,
                timer: 1500
            })
        } else {
            Swal.fire({
                icon: "error",
                title: "Cielos",
                text: "Hubo un error de parte del servidor :c",
                showConfirmButton: false,
                timer: 1500
            })
        }
        setNombre("")
        setTipoMuestra("")
        setConcentracion(0)
        setCorreo("")
    }

    return (
        <>
            <form className='registration-form'>
                <h1 className='registration-form__header'>Formulario de registro</h1>
                <input
                    type="text"
                    placeholder='Nombre'
                    className='registration-form__input'
                    onChange={e => {
                        setNombre(e.target.value)
                    }}
                    value={nombre}
                />
                <input
                    type="text"
                    placeholder='Tipo de muestra'
                    className='registration-form__input'
                    onChange={e => {
                        setTipoMuestra(e.target.value)
                    }}
                    value={tipoMuestra}
                />
                <input
                    type="number"
                    placeholder='Concentracion en mmol/L'
                    className='registration-form__input'
                    onChange={e => {
                        setConcentracion(e.target.value)
                    }}
                    value={concentracionG}
                />
                <input
                    type="email"
                    placeholder='Correo electronico'
                    className='registration-form__input'
                    onChange={e => {
                        setCorreo(e.target.value)
                    }}
                    value={correo}
                />

                <button
                    type='button'
                    className='registration-form_button'
                    onClick={verificacionCamposLlenos}
                >
                    ¡Enviar!
                </button>
            </form>
            <img
                src={FormImg}
                alt="imagen formulario"
                className='img-form'
            />
        </>
    )
}

export { Form }