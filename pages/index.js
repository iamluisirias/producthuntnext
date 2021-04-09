import React from 'react';
import Layout from '../components/layout/Layout';
import ProductoListado from '../components/layout/ProductoListado';
import useProducto from '../hooks/useProducto';


const Home = () => {

  const { productos } = useProducto('creado');

  return (
    <>
      <Layout>
        <div className="listado-productos">
          <div className="contenedor">
            <ul className="bg-white">
              {
                productos.map(producto => (
                  <ProductoListado 
                    key={producto.id}
                    producto={producto}
                  />
                ))
              }
            </ul>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Home;