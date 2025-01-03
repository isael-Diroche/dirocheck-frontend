'use client'

import React, { useState, useEffect } from 'react';
import { Shop } from "@/app/shop/lib/model";
import { ShopService } from '../lib/service';

const shopService = new ShopService();

interface UpdateFormProps {
    shop: Shop;
    onClose: () => void;
    onUpdate: (updatedShop: Shop) => void;
}

const UpdateForm: React.FC<UpdateFormProps> = ({ shop, onClose, onUpdate }) => {
    const [shops, setShops] = useState<Shop[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [formData, setFormData] = useState<Shop>(shop);

    useEffect(() => {
        setFormData(shop);
    }, [shop]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await shopService.updateShop(formData.id.toString(), formData);
            setShops(shops.map(s => s.id === formData.id ? formData : s));
            onUpdate(formData);
            onClose();
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError("Ha ocurrido un error desconocido");
            }
            console.error("Error actualizando negocio:", error);
        }
    };

    return (
        <>
            <div>
                <h1>Update Form</h1>
                {error && <p className='text-red-500'>{error}</p>}
                <form onSubmit={handleSubmit}>
                    <label htmlFor="id">ID</label>
                    <input type="number" name="id" id="id" value={formData.id} onChange={handleChange} required />
                    <label htmlFor="name">Nombre</label>
                    <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} required />
                    <label htmlFor="address">Dirección</label>
                    <input type="text" name="address" id="address" value={formData.address} onChange={handleChange} required />
                    <button type="submit">Actualizar</button>
                </form>
            </div>
        </>
    );
};

export default UpdateForm;