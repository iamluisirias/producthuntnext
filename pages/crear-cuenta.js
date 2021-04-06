import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import { css } from '@emotion/react';

//Metodos de redireccionamiento
import Router from 'next/router';

//Firebase
import firebase from '../firebase';

//StyledComponents
import { FormStyled, Campo, InputSubmit, ErrorStyled } from '../styled/Formulario';

//Custom hook para validaciones
import useValidacion from '../hooks/useValidacion';

//Validacion
import validarCrearCuenta from '../validation/validarCrearCuenta';

//State inicial de crear cuenta
const STATE_INICIAL = {
    nombre: '',
    email: '',
    password: ''
}

const CrearCuenta = () => {

    //state local
    const [ error, setError ] = useState(false);
    const { 
        valores, 
        errores, 
        handleChange,
        handleSubmit,
        handleBlur
    } = useValidacion(STATE_INICIAL, validarCrearCuenta, crearCuenta);

     //Extrayendo los valores
    const { nombre, email, password } = valores;

    //Registrar una nueva cuenta con los valores ingresados en el form.
    async function crearCuenta() {
        try {
            await firebase.registrar(nombre, email, password);
            Router.push('/');
        } catch (error) {
            console.error('Hubo un error al crear el usuario. ', error.message);
            setError(error.message);
        }
    }

    return (
        <Layout>
            <>
                <h1
                    css={css`
                        text-align: center;
                        margin-top: 5rem;
                    `}
                >Crea una cuenta</h1>
                <FormStyled
                    onSubmit={handleSubmit}
                    noValidate
                >
                    <Campo>
                        <label htmlFor="nombre">Nombre</label>
                        <input 
                            type="text" 
                            name="nombre" 
                            id="nombre" 
                            placeholder="Tu nombre"
                            value={nombre}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                    </Campo>

                    {
                        errores.nombre && <ErrorStyled>{errores.nombre}</ErrorStyled>
                    }

                    <Campo>
                        <label htmlFor="email">Correo</label>
                        <input 
                            type="email" 
                            name="email" 
                            id="email" 
                            placeholder="Tu correo electrónico"
                            value={email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                    </Campo>

                    {
                        errores.email && <ErrorStyled>{errores.email}</ErrorStyled>
                    }

                    <Campo>
                        <label htmlFor="password">Contraseña</label>
                        <input 
                            type="password" 
                            name="password" 
                            id="password" 
                            placeholder="Escribe una contraseña"
                            value={password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                    </Campo>

                    {
                        errores.password && <ErrorStyled>{errores.password}</ErrorStyled>
                    }

                    {
                        error && <ErrorStyled>{error}</ErrorStyled>
                    }

                    <InputSubmit type="submit" value="Crear Cuenta"/>
                </FormStyled>

            </>
        </Layout>
    );
};

export default CrearCuenta;