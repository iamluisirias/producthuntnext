const validarCrearCuenta = valores => {

    //Destructuring
    const { nombre, email, password } = valores;

    let errores = {};

    //Validar el nombre del usuario
    if (!nombre) {
        errores.nombre = "El nombre es obligatorio";
    }

    //Validar el correo del usuario
    if (!email) {
        errores.email = "El correo es obligatorio";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
        errores.email = "Debe de ser un correo válido";        
    }

    //Validar el correo del usuario
    if (!password) {
        errores.password = "La contraseña es obligatoria";
    } else if (password.length < 6 ) {
        errores.password = "La contraseña debe ser mínimo de seis caracteres ";
    }

    return errores;
    
}

export default validarCrearCuenta;