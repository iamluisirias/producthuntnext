import React, { useContext, useState } from 'react';
import Layout from '../components/layout/Layout';
import { css } from '@emotion/react';
import FileUploader from 'react-firebase-file-uploader';

import Router, { useRouter } from 'next/router';

import { FirebaseContext } from '../firebase';

import useValidacion from '../hooks/useValidacion';
import validarProducto from '../validation/validarProducto';

import { Campo, ErrorStyled, FormStyled, InputSubmit } from '../styled/Formulario';
import Error404 from '../components/layout/Error404';

//State inicial que definira los valores.
const STATE_INICIAL = {
    nombre: '',
    empresa: '',
    //imagen: '',
    url: '',
    descripcion: ''
}

const NuevoProducto = () => {

    //State local
    const [ error, setError ] = useState(null);

    //State de la dependencia de las imagenes
    const [ nombreimagen, setNombre ] = useState('');
    const [ subiendo, setSubiendo ] = useState(false);
    const [ progreso, setProgreso ] = useState(0);
    const [ urlimagen, setUrlImagen ] = useState('');

    //Custom hook
    const {
        valores, 
        errores, 
        handleChange,
        handleSubmit,
        handleBlur
    } = useValidacion(STATE_INICIAL, validarProducto, agregarProducto);

    const { nombre, empresa, imagen, url, descripcion } = valores;

    //hook de router
    const router = useRouter();

    //context de firebase
    const { usuario, firebase } = useContext(FirebaseContext);

    async function agregarProducto() {

        //Si el usuario no ha hecho login, se redirecciona a esta pagina
        if (!usuario) {
            return router.push('/login');
        }

        //Se crea el objeto producto
        const producto = {
            nombre,
            empresa,
            url,
            urlimagen,
            descripcion,
            //Ahora los datos que no provee el usuario
            votos: 0,
            comentarios: [],
            creado: Date.now(),
            creador: {
                id: usuario.uid,
                nombre: usuario.displayName
            },
            haVotado: []
        }

        //Ahora insertar el objeto creado a la base de datos.
        firebase.db.collection('productos').add(producto);
        router.push('/');
    }

    const handleUploadStart = () => {
        setProgreso(0);
        setSubiendo(true);
    };

    const handleProgress = progreso => setProgreso({ progreso });

    const handleUploadError = error => {
        setSubiendo(error);
        console.error(error);
    };

    const handleUploadSuccess = nombre => {
        setProgreso(100);
        setSubiendo(false);
        setNombre(nombre)

        firebase
            .storage
            .ref("productos")
            .child(nombre)
            .getDownloadURL()
            .then(
                url => {
                    console.log(url);
                    setUrlImagen(url);
                }
            );
    }

    return (
        <Layout>
            {
                !usuario ? <Error404 mensaje="Inicia Sesión para crear un producto"/> :
                <>
                    <h1 css={css`
                        text-align: center;
                        margin-top: 5rem;
                    `}
                    >Agrega un nuevo producto</h1>

                    <FormStyled
                        onSubmit={handleSubmit}
                        noValidate
                    >
                        <fieldset>
                            <legend>Información general</legend>
                            <Campo>
                                <label htmlFor="nombre">Producto</label>
                                <input 
                                    type="text" 
                                    name="nombre" 
                                    id="nombre"
                                    placeholder="Producto"
                                    value={nombre}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </Campo>

                            {
                                errores.nombre && <ErrorStyled>{errores.nombre}</ErrorStyled>
                            }

                            <Campo>
                                <label htmlFor="empresa">Empresa</label>
                                <input 
                                    type="text" 
                                    name="empresa" 
                                    id="empresa"
                                    placeholder="Nombre de la empresa"
                                    value={empresa}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </Campo>

                            {
                                errores.empresa && <ErrorStyled>{errores.empresa}</ErrorStyled>
                            }

                            <Campo>
                                <label htmlFor="imagen">Imagen</label>
                                <FileUploader 
                                    name="imagen" 
                                    id="imagen"
                                    accept="image/*"
                                    name="avatar"
                                    randomizeFilename
                                    storageRef={firebase.storage.ref("productos")}
                                    onUploadStart={handleUploadStart}
                                    onUploadError={handleUploadError}
                                    onUploadSuccess={handleUploadSuccess}
                                    onProgress={handleProgress}
                                />
                            </Campo>

                            <Campo>
                                <label htmlFor="url">URL</label>
                                <input 
                                    type="url" 
                                    name="url" 
                                    id="url"
                                    placeholder="Ej. http://www.ejemplo.com"
                                    value={url}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </Campo>

                            {
                                errores.url && <ErrorStyled>{errores.url}</ErrorStyled>
                            }
                        </fieldset>

                        <fieldset>
                            <legend>Sobre tu producto</legend>
                            <Campo>
                                <label htmlFor="descripcion">Descripcion</label>
                                <textarea 
                                    name="descripcion" 
                                    id="descripcion"
                                    value={descripcion}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </Campo>

                            {
                                errores.descripcion && <ErrorStyled>{errores.descripcion}</ErrorStyled>
                            }
                        </fieldset>

                        
                        {
                            error && <ErrorStyled>{error}</ErrorStyled>
                        }

                        <InputSubmit type="submit" value="Agregar Producto"/>
                    </FormStyled>
                </>
            }
            
        </Layout>
    );
};

export default NuevoProducto;