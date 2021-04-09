import React, { useContext, useEffect, useState } from 'react';
import { FirebaseContext } from '../firebase';

const useProducto = orden => {

    //State local
    const [ productos, setProductos ] = useState([]);

    //Context de firebase
    const { firebase } = useContext(FirebaseContext);

    //Para obtener los productos en cuanto el componente/pagina esté lista.
    useEffect(() => {
        const obtenerProductos = () => {
        //Primero hacemos referencia a firebase a traves de su context.
        //Luego a la coleccion en la base de datos, 
        //Ordenamos los registros de acuerdo a un campo, en este caso la fecha de creación, de manera descendente.
        //Luego manejamos ese snapshot o instantanea de la base de datos en ese momento con una funcion callback.
        //Esta funcion de callback se ejecuta automaticamente en cada instantanea de la base de datos.
        firebase.db.collection('productos').orderBy(orden, 'desc').onSnapshot(manejarSnapshot);
        }

        obtenerProductos();
    },[]);

    //Función de callback.
    //El callback en firebase recibe el parametro snapshot que es implicito en la funcion onSnapshot.
    function manejarSnapshot(snapshot) {

        //Por cada documento dentro del snapshot de la colección, se retornará un objeto con el id y los datos de dicho documento o registro.
        const productos = snapshot.docs.map(doc => {
        return {
            id: doc.id,     //Se incluye el id que automaticamente le asigno firebase al objeto de producto que previamente fue agregado.
            ...doc.data()
        }
        });

        setProductos(productos);
    }

    return {
        productos
    }
};

export default useProducto;