const validarLogin = valores => {

    const { email, password } = valores;

    let errores = {};

    //Validando el email
    if (!email) {
        errores.email = "Correo obligatorio";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
        errores.email = "Correo no válido";
    }

    //Validando el password
    if (!password) {
        errores.password = "La contraseña es obligatoria";
    }

    return errores;
}

export default validarLogin;