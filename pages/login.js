import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import { css } from '@emotion/react';

//Firebase
import firebase from '../firebase';

//Routing
import Router from 'next/router';

//Styled components
import { FormStyled, Campo, InputSubmit, ErrorStyled } from '../styled/Formulario'

//Custom hook
import useValidacion from '../hooks/useValidacion';

//Validacion
import validarLogin from '../validation/validarLogin';

//State local inicial
const STATE_INICIAL = {
    email: '',
    password: ''
}

const Login = () => {

    //State local error
    const [ error, setError ] = useState(false);

    const { valores, errores, handleChange, handleSubmit, handleBlur } = useValidacion(STATE_INICIAL, validarLogin, iniciarSesion);

    //Destructuring
    const { email, password } = valores;

    //Funcion para crear usuario
    async function iniciarSesion() {
        try {
            await firebase.loguear(email, password);
            Router.push('/');
        } catch (error) {
            console.error('Hubo un error al iniciar sesion', error);
            setError(error.message);
        }
    }

    return (
        <Layout>
            <>
                <h1 css={css`
                    text-align: center;
                    margin-top: 5rem;
                `}
                >Inicia Sesion</h1>

                <FormStyled
                    onSubmit={handleSubmit}
                    noValidate
                >
                    <Campo>
                        <label htmlFor="email">Correo</label>
                        <input 
                            type="email" 
                            name="email" 
                            id="email"
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

                    <InputSubmit type="submit" value="Iniciar Sesión"/>
                </FormStyled>
            </>
        </Layout>
    );
};

export default Login;