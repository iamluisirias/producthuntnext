import React, { useEffect, useState } from 'react';

const useValidacion = (stateInicial, validar, funcion) => {

    const [ valores, setValores ] = useState(stateInicial);
    const [ errores, setErrores ] = useState({});
    const [ submitForm, setSubmitForm ] = useState(false);

    useEffect(() => {
        if (submitForm) {
            const noErrores = Object.keys(errores).length === 0;    //true or false.

            if (noErrores) {
                funcion();  //Funcion que se mandara a llamar en el componente.
            }

            setSubmitForm(false);
        }
    },[errores])

    //Funcion que se ejecuta conforme el usuario escribe algo en los campos.
    const handleChange = e => {
        setValores({
            ...valores,
            [e.target.name]: e.target.value
        })
    }

    //Funcion que se ejecuta cuando el usuario hace submit al form.
    const handleSubmit = e => {
        e.preventDefault();

        const validacionErrores = validar(valores);     //La funcion para validar los valores que se pasa como parametro al hook.
        setErrores(validacionErrores);

        setSubmitForm(true);
    }

    //Funcion que se ejecuta cuando el usuario hace blur a un input.
    const handleBlur = () => {
        const validacionErrores = validar(valores);     //La funcion para validar los valores que se pasa como parametro al hook.
        setErrores(validacionErrores);
    }

    return {
        valores, 
        errores, 
        submitForm,
        handleChange,
        handleSubmit,
        handleBlur
    }
};

export default useValidacion;