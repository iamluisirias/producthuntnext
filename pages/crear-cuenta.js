import React from 'react';
import Layout from '../components/layout/Layout';
import { css } from '@emotion/react';

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

    const { 
        valores, 
        errores, 
        submitForm,
        handleChange,
        handleSubmit,
        handleBlur
     } = useValidacion(STATE_INICIAL, validarCrearCuenta, crearCuenta);

     //Extrayendo los valores
     const { nombre, email, password } = valores;

    function crearCuenta() {
        console.log('Creando cuenta...');
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

                    <InputSubmit type="submit" value="Crear Cuenta"/>
                </FormStyled>

            </>
        </Layout>
    );
};

export default CrearCuenta;