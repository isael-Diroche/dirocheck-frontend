'use client';

import { useState } from 'react';
import axios from 'axios';

const ProductForm = () => {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProduct = { name, quantity, description };
    const productData = {
        name: 'Producto Ejemplo',
        price: 100,
        description: 'Descripción del producto',
      };
    axios.post('http://127.0.0.1:8000/api/products/', newProduct)
      .then((response) => {
        console.log('Product added:', response.data);
        setName('');
        setQuantity('');
        setDescription('');
      })
      .catch((error) => {
        console.error('Error adding product:', error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Product Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="number"
        placeholder="Quantity"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit">Add Product</button>
    </form>
  );
};

export default ProductForm;
