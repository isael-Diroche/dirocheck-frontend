'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/products/')
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold">Product List</h1>
      <ul>
        {products.map(product => (
          <li key={product.id} className="flex justify-between">
            {product.name} - {product.quantity}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
