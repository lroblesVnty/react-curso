import { useEffect, useState } from 'react';
import { productsService } from '../services/api'; // Importas el servicio

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await productsService.getAll(); // Llamada limpia a la API
        setProducts(data);
      } catch (error) {
        console.error("Error al cargar productos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p>Cargando productos...</p>;

  return (
    <div>
      {products.map(product => <p key={product.id}>{product.name}</p>)}
    </div>
  );
}

export default Home;