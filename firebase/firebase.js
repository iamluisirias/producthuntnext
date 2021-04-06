import app from 'firebase/app';

//Productos de firebase a utilizar
import "firebase/auth";

import firebaseConfig from './config';

//Una clase Firebase con el constructor con los parámetros de configuración.
class Firebase {
    constructor() {
        if (!app.apps.length) {
            app.initializeApp(firebaseConfig);
        }

        //Habilitando el producto de autenticacion.
        this.auth = app.auth();
    }

    //Funciones de la clase
    //Registrar un nuevo usuario
    async registrar(nombre, email, password) {

        //Metodo de firebase que crea un nuevo usuario con email y contraseña.
        const nuevoUsuario = await this.auth.createUserWithEmailAndPassword(email, password);

        //Actualizamos el perfil del usuario con el nombre pasado en la función y retornamos el nuevo usuario.
        return await nuevoUsuario.user.updateProfile({
            displayName: nombre
        })
        
    }
}

//Instancia de la clase Firebase
const firebase = new Firebase();

//Se exporta por defaault esa instancia.
export default firebase;