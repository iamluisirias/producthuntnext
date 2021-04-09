import React, { useState } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import Router from 'next/router';

const InputText = styled.input`
    border: 1px solid var(--gris3);
    padding: 1rem;
    min-width: 300px;

    &:focus {
        outline: none;
    }
`;

const InputButton = styled.button`
    height: 3rem;
    width: 3rem;
    display: block;
    background-size: 4rem;
    background-image: url('/static/img/buscar.png');
    background-repeat: no-repeat;
    position: absolute;
    right: 1rem;
    top: 1px;
    background-color: white;
    border: none;
    text-indent: -9999px;

    &:focus {
        outline: none;
    }

    &:hover {
        cursor: pointer;
    }
`;

const Buscar = () => {
    
    const [ busqueda, setBusqueda ] = useState('');

    //On submit
    const buscarProducto = e => {
        e.preventDefault();

        if(busqueda.trim() === '') {
            return;
        }

        //redireccionar a /buscar
        Router.push({
            pathname: '/buscar',
            query: { q: busqueda } //La q es la llave de lo que se quiere buscar, se recomienda la q de query.
        })



    }

    return (
        <form
            css={css`
                position: relative;
            `}
            onSubmit={buscarProducto}
        >
            <InputText 
                type="text"
                placeholder="Buscar productos"
                onChange={e => setBusqueda(e.target.value)}
            />
            <InputButton type="submit">Buscar</InputButton>
        </form>
    );
};

export default Buscar;