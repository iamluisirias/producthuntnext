import React, { useEffect, useState } from 'react';
import Layout from '../components/layout/Layout';
import { useRouter } from 'next/router';
import ProductoListado from '../components/layout/ProductoListado';
import useProducto from '../hooks/useProducto';

const Buscar = () => {
    const [ resultados, setResultados ] = useState([]);

    const router = useRouter();

    const { productos } = useProducto('creado');
    
    const { query: { q } } = router;

    useEffect(() => {
        const busqueda = q.toLowerCase();
        const filtro = productos.filter(producto => {
            return (
                producto.nombre.toLowerCase().includes(busqueda) ||
                producto.descripcion.toLowerCase().includes(busqueda)
            )       
        });

        setResultados(filtro);

    },[ q, productos ])

    return (
        <>
          <Layout>
            <div className="listado-productos">
              <div className="contenedor">
                <ul className="bg-white">
                  {
                    resultados.map(producto => (
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

export default Buscar;