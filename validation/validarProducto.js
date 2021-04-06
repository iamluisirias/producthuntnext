const validarProducto = valores => {
    const { nombre, empresa, url, descripcion } = valores;

    let errores = {};

    if (!nombre) {
        errores.nombre = "El nombre del producto es obligatorio";
    }

    if (!empresa) {
        errores.empresa = "Añade la empresa del producto";
    }

    if (!url) {
        errores.url = "Añade una url al producto";
    } else if (!/^(ftp|http|https):\/\/[^ "]+$/.test(url)) {
        errores.url = "Añade una url válida";
    }

    if (!descripcion) {
        errores.descripcion = "Añade una descripción del producto";
    }

    return errores;
};

export default validarProducto;