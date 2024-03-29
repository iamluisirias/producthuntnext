import React, { useContext } from 'react';

//Componentes
import Buscar from '../ui/Buscar';
import Boton from '../../styled/Boton';
import Navegacion from './Navegacion';


//Routing
import Link from 'next/link';

//Estilos
import styled from '@emotion/styled';
import { css } from '@emotion/react';

//Firebase
import { FirebaseContext } from '../../firebase';

//StyledComponents
const ContenedorHeader = styled.div`
    max-width: 1200px;
    width: 95%auto;
    margin: 0 auto;

    @media (min-width:768px) {
        display: flex;
        justify-content: space-between;
    }
`;

const Logo = styled.a`
    color: var(--naranja);
    font-size: 4rem;
    line-height: 0;
    font-weight: 700;
    font-family: 'Roboto Slab', serif;
    margin-right: 2rem;

    &:hover {
        cursor: pointer;
    }
`;

const Header = () => {

    const { usuario, firebase } = useContext(FirebaseContext);

    //Hasta la proxima
    const cerrarSesion = () => firebase.logout();

    return (
        <header
            css={css`
                border-bottom: 2px solid var(--gris3);
                padding: 1rem 0;
            `}
        >
            <ContenedorHeader>
                <div
                    css={css`
                        display: flex;
                        align-items: center;
                    `}
                > 
                    <Link href="/">
                        <Logo>P</Logo>
                    </Link>

                    <Buscar/>
                    <Navegacion/>
                </div>
                <div
                    css={css`
                        display: flex;
                        align-items: center;
                    `}
                > 
                    {/* Menu de administracion */}
                    {
                        usuario ?
                        (
                            <>
                                <p
                                    css={css`
                                        margin-right: 2rem;
                                    `}
                                >Hola: {usuario.displayName}</p>

                                <Boton 
                                    bgColor="true"
                                    onClick={() => cerrarSesion()}
                                
                                >Cerrar Sesión</Boton>
                            </>
                        ) :
                        (
                            <>
                                
                                <Link href="/login">
                                    <Boton
                                        bgColor="true"
                                    >Iniciar Sesión</Boton>
                                </Link> 
                                
                                
                                <Link href="/crear-cuenta">
                                    <Boton>Crear Cuenta</Boton>
                                </Link> 
                                
                            </>
                        )
                    }

                    
                    
                </div>
            </ContenedorHeader>
        </header>
    );
};

export default Header;