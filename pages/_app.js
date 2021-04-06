import App from 'next/app';
import firebase, { FirebaseContext } from '../firebase';
import useAutenticacion from '../hooks/useAutenticacion';

const  MyApp = props => {

  const { Component, pageProps } = props;
  const usuario = useAutenticacion();

  return (
    <FirebaseContext.Provider
      value={{
        firebase,
        usuario   //Para hacer el usuario logueado disponible en todos los componentes.
      }}
    >
      <Component {...pageProps}/>
    </FirebaseContext.Provider>
  )
    
  
}

export default MyApp;