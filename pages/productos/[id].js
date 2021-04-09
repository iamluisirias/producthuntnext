import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { FirebaseContext } from '../../firebase';

import Layout from '../../components/layout/Layout';
import Error404 from '../../components/layout/Error404';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { es } from 'date-fns/locale';

import { Campo, InputSubmit } from '../../styled/Formulario';
import Boton from '../../styled/Boton';
import Spinner from '../../components/ui/Spinner';

//Styled Components
const ContenedorProducto = styled.div`

    background-color: #fff;
    padding: 1rem;

    @media ( min-width: 768px ) {
        display: grid;
        grid-template-columns: 2fr 1fr;
        column-gap: 2rem
    }
`;

const CreadorProducto = styled.p`
    padding: .5rem 2rem;
    background-color: #da552f;
    color: #fff;
    text-transform: uppercase;
    font-weight: bold;
    display: inline-block;
    text-align: center;
`;

const Span = styled.span`
    font-weight: 700;
`;

const ProductoDetallado = () => {
    
    //State local
    const [ producto, setProducto ] = useState({});
    const [ error, setError ] = useState(false);
    const [ comentario, setComentario ] = useState({}); 
    const [ consultar, setConsultar ] = useState(true);

    const router = useRouter();
    const { id } = router.query;

    //Firebase context
    const { firebase, usuario } = useContext(FirebaseContext);

    //React cada vez que renderiza lee el query del router por lo que al principio del render este valor es undefined, este useEffect viene para prevenir ese comportamiento y ejecutar la funcion de extraer y mostrar los datos del producto de la bd solo si existe el valor del id, de lo contario, nextjs nos dara un error.
    useEffect(() => {
        if (id && consultar) {

            const obtenerProducto = async () => {
                //Consulta query
                const productoQuery = await firebase.db.collection('productos').doc(id);

                const producto = await productoQuery.get();

                if ( producto.exists ) {
                    setProducto( producto.data() );
                    setConsultar( false );
                } else {
                    setError( true );
                    setConsultar( false );
                }
            }

            obtenerProducto();

        }
    },[id]);

    //Para mostrar un pequeño mensaje mientras carga la consulta.
    if (Object.keys(producto).length === 0 && !error) {
        return <Spinner/>
    }

    const {  nombre, empresa, url, urlimagen, descripcion, votos, comentarios, creado, creador, haVotado } = producto;

    //Administrar y validar los votos.
    const votarProducto = () => {
        if (!usuario) {
            return router.push('/login');
        }

        //Comprobando votos duplicados
        //Si el arreglo de los usuarios que han votado incluye al usuario actual no agrega el voto. 
        if (haVotado.includes(usuario.uid)) {
            return;
        }

        //Obtener y sumar votos
        const nuevoTotal = votos + 1;
        
        //Registrando el voto unico del usuario al producto.
        const votoRegistrado = [...haVotado, usuario.uid];

        //Actualizar en la base de datos
        firebase.db.collection('productos').doc(id).update({ 
            votos: nuevoTotal, 
            haVotado: votoRegistrado 
        });

        //Actualizar al momento en el state
        setProducto({
            ...producto,            //Copia de todo el producto.
            votos: nuevoTotal       //Unico campo a cambiar.
        })

        //Para "activar el useEffect y vuelva a hacer la consulta y recargue el componente"
        setConsultar(true);
    }

    //Funcion para crear los comentarios.
    const comentarioChange = e => {
        setComentario({
            ...comentario,
            [e.target.name]: e.target.value
        })
    }

    //Funcion que identifica si el que hizo el comentario es el creador del producto
    const esCreador = id => {
        if (creador.id == id ) {
            return true;
        }

        return false;
    }

    //Funcion para agregar los comentarios
    const agregarComentario = e => {
        e.preventDefault();

        if (!usuario) {
            return router.push('/login');
        }

        //Informacion extra al comentario
        comentario.usuarioId = usuario.uid;
        comentario.usuarioNombre = usuario.displayName;

        //Copia de los comentarios y luego guardarlos en el arreglo
        //Comentarios del state + el nuevo comentario.
        const comentariosActualizados = [...comentarios, comentario];

        //Actualizar la base de datos
        firebase.db.collection('productos').doc(id).update({
            comentarios: comentariosActualizados
        })

        //ActualizarState
        setProducto({
            ...producto,
            comentarios: comentariosActualizados
        })

        setConsultar(true);
    }

    //Funcion para verificar si un usuario puede borrar la publicacion de un producto.
    const puedeBorrar = () => {
        if (!usuario) {
            return false;
        }

        if (creador.id === usuario.uid) {
            return true;
        }
    }

    //Funcion para eliminar un producto
    const borrarProducto = async () => {
        
        if (!usuario) {
            return router.push('/login');
        }

        if (creador.id !== usuario.uid) {
            return router.push('/login');
        }

        try {
           await firebase.db.collection('productos').doc(id).delete();
           router.push('/');
           
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Layout>
            <>
                { error ? ( <Error404 mensaje="Producto no encontrado"/> ) : (
                    <div className="contenedor">
                        <h1 css={css`
                            text-align: center;
                            margin-top: 5rem;
                        `}>{ nombre }</h1>

                        <ContenedorProducto>
                            <div>
                                <p>Publicado hace: { formatDistanceToNow(new Date(creado), {locale: es}) }</p>
                                <p>Por <Span>{creador.nombre}</Span> de <Span>{empresa}</Span></p>

                                <img src={urlimagen} alt={nombre}/>
                                <p>{descripcion}</p>

                                {
                                    usuario && (
                                        <>
                                            <h2>Agrega un comentario</h2>
                                            <form
                                                onSubmit={agregarComentario}
                                            >
                                            <Campo>
                                                <input 
                                                    type="text" 
                                                    name="mensaje" 
                                                    id="mensaje"
                                                    onChange={comentarioChange}
                                                />
                                            </Campo>
                                            <InputSubmit 
                                                type="submit" 
                                                value="Agregar Comentario"
                                            />
                                            </form>
                                        </>
                                    )
                                }

                                <h2 css={css`
                                    margin: 2rem 0;
                                `}>Comentarios</h2>

                                {
                                    comentarios.length === 0 ? 'Aún no hay comentarios' : (
                                        <ul>
                                        {
                                            comentarios.map(comentario => (
                                                <li
                                                    key={`${comentario.usuarioId}-${comentario.usuarioNombre}-${Math.random()}`}
                                                    css={css`
                                                        border: 1px solid #e1e1e1;
                                                        padding: 2rem;
                                                    `}
                                                >
                                                    <p>{comentario.mensaje}</p>
                                                    <p>Escrito por: 
                                                        <Span>
                                                            {' '}{comentario.usuarioNombre}
                                                    </Span>
                                                    </p>
                                                    {
                                                        esCreador(comentario.usuarioId) ? <CreadorProducto>CREADOR</CreadorProducto> : null  
                                                    }
                                                </li>
                                            ))
                                        }
                                        </ul>
                                    )
                                }

                                

                            </div>
                            <aside>
                                <Boton
                                    target="_blank"
                                    bgColor="true"
                                    href={url}
                                >Visitar URL</Boton>

                                <div css={css`
                                    margin-top: 5rem;
                                `}>
                                    <p css={css`
                                        text-align: center;
                                    `}>{votos} Votos</p>

                                    {
                                        usuario && (
                                            <Boton
                                                onClick={votarProducto}
                                            >Votar</Boton>
                                        )
                                    }
                                </div>
                            </aside>
                        </ContenedorProducto>

                        {
                            puedeBorrar() && <Boton onClick={borrarProducto}>Eliminar Producto</Boton>
                        }
                    </div>
                )}

                
            </>
        </Layout>
    )
}

export default ProductoDetallado;