'use client'

import React, { useEffect, useState } from 'react';
import { Inventory } from "../../lib/model";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/app/shop/components/ui/dialog';
import { Button } from "@/app/shop/components/ui/button";

import { InventoryService } from "@/app/inventory/lib/service";
const inventoryService = new InventoryService();

interface CreateInventoryFormProps {
    shopId: string;
    onInventoryCreated: (inventory: Inventory) => void;
    isOpen: boolean;
    onCancel: () => void;
    onClose: () => void;
}

const CreateInventoryForm: React.FC<CreateInventoryFormProps> = ({ shopId, onInventoryCreated, isOpen, onCancel, onClose }) => {
    const [inventories, setInventories] = useState<Inventory[]>([]);
    const [formData, setFormData] = useState<Inventory>({
        id: 0,
        shop: shopId,
        name: "",
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        try {
            const createdInventory = await inventoryService.createInventory(shopId, formData);
            
            // Actualizar la lista de productos
            setInventories([...inventories, createdInventory]);

            // Limpiar el formulario
            setFormData({
                id: 0,
                shop: shopId,
                name: "",
            });
            onInventoryCreated(createdInventory);
            onClose();
        } catch (error) {
            console.error('Hubo un error creando el inventario:', error);
        }
    };

    useEffect(() => {
        const fetchInventories = async () => {
            try {
                const data = inventories;
                setInventories(data);
            } catch (error) {
                console.error('Error fetching inventories:', error);
            }
        };
        fetchInventories();
    }, []);

    return (
        <>
            <Dialog open={isOpen} onOpenChange={onClose}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle className="text-center">Crear Nuevo Inventario</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="bg-white">
                        <div className='mb-4'>
                            <label className='block text-sm font-medium text-gray-700'>Nombre</label>
                            <input
                                type='text'
                                name='name'
                                value={formData.name || ''}
                                onChange={handleInputChange}
                                className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2'
                            />
                        </div>

                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={onCancel}>
                                Cancelar
                            </Button>
                            <Button type="submit" onClick={onClose} className="bg-green-500 hover:bg-green-600 text-white">
                                Crear Inventario
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

        </>
    );
};

export default CreateInventoryForm;
