import React, { useEffect, useState } from 'react';
import firebase from '../firebase';

const useAutenticacion = () => {

    //State para guardar el login o usuario en sesión.
    const [ usuarioLogueado, setUsuarioLogueado ] = useState(null);

    useEffect(() => {
        const unsuscribed = firebase.auth.onAuthStateChanged(usuario => {
            if (usuario) {
                setUsuarioLogueado(usuario);
            } else {
                setUsuarioLogueado(null);
            }
        })

        return () => unsuscribed();
    },[])

    return usuarioLogueado;
};

export default useAutenticacion;