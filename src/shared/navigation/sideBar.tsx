'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from "next/link";

import { IoIosAlbums, IoMdContact, IoMdCube } from "react-icons/io";
import { IoDocumentText, IoReceipt, IoBarChart, IoSettings, IoLockClosed } from "react-icons/io5";
import { Shop } from '@/app/shop/lib/model';
import { ShopService } from '@/app/shop/lib/service';

const shopService = new ShopService();

export default function Sidebar() {
    const [shop, setShop] = useState<Shop | null>(null);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const [isClient, setIsClient] = useState(false); // Detecta si estamos en el cliente
    const [selectedShop, setSelectedShop] = useState<string | null>(null);

    useEffect(() => {
        setIsClient(true); // Marcamos que estamos en el cliente

        if (typeof window !== 'undefined') {
            const shop = localStorage.getItem('selectedShop');
            setSelectedShop(shop);
        }
    }, []);

    useEffect(() => {
        const handleShopUpdate = () => {
            const updatedShop = localStorage.getItem('selectedShop');
            setSelectedShop(updatedShop);
        };

        if (selectedShop) {
            fetchShop(selectedShop);
        }

        window.addEventListener('shop-updated', handleShopUpdate);
        return () => {
            window.removeEventListener('shop-updated', handleShopUpdate);
        };
    }, [selectedShop]);

    const fetchShop = async (shopId: string) => {
        try {
            const data = await shopService.getShop(shopId);
            setShop(data);
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError("Ha ocurrido un error desconocido");
            }
            console.error("Error obteniendo negocio:", error);
        }
    };

    const handleDeselectShop = () => {
        localStorage.removeItem('selectedShop');
        setSelectedShop(null);
        router.push('/shop-selection');
    };

    if (!isClient) {
        return null; // Renderiza solo después de que el cliente esté listo
    }

    const links = [
        {
            name: "Tablero",
            href: "/",
            icon: <IoIosAlbums size={18} />,
            disabled: selectedShop ? false : true
        },
        {
            name: "Productos",
            href: "/products",
            icon: <IoMdCube size={18} />,
            disabled: selectedShop ? false : true
        },
        {
            name: "Inventarios",
            href: "/inventory",
            icon: <IoDocumentText size={18} />,
            disabled: selectedShop ? false : true
        },
        {
            name: "Facturas",
            href: "/invoices",
            icon: <IoReceipt size={18} />,
            disabled: true
        },
        {
            name: "Otros",
            href: "/others",
            icon: <IoBarChart size={18} />,
            disabled: true
        },
    ];

    const linksFooter = [
        {
            name: "Soporte",
            href: "/support",
            icon: <IoMdContact size={18} />,
            disabled: true
        },
        {
            name: "Configuración",
            href: "/settings",
            icon: <IoSettings size={18} />,
            disabled: true
        },
    ];

    return (
        <>
            <div className="flex w-[293px] flex-col justify-between items-center shrink-0 self-stretch pt-2">
                <div className="flex h-full flex-col items-start self-stretch">
                    <div className="flex h-full flex-col justify-between items-start self-stretch">
                        <div className="flex flex-col items-start gap-6 self-stretch">
                            <Link href={"/"} className='group'>
                                <div className="flex py-2 px-6 items-center gap-[10px] self-stretch group-hover:scale-105 transition-all duration-150 ease-linear">
                                    <div className="flex flex-col items-start select-none">
                                        <h1 className="text-3xl font-extrabold text-gray-800 font-golos tracking-tight">
                                            Diro<span className='text-green-500'>check</span>
                                            <span className='text-2xl mb-1'>✅</span>
                                        </h1>
                                        <span className='text-xs font-golos text-gray-600'>
                                            Administra tu negocio
                                        </span>
                                    </div>
                                </div>

                            </Link>

                            <div className="flex px-[14px] flex-col items-start gap-4 self-stretch">
                                {selectedShop ? (
                                    <div className="flex items-center justify-between w-full gap-4">
                                        <div className="flex flex-col">
                                            <span className='text-[10px] font-inter text-gray-600 font-semibold tracking-wider uppercase'>Negocio</span>
                                            <p className='font-inter font-semibold text-gray-800'>{shop?.name}</p>
                                        </div>
                                        <button
                                            onClick={handleDeselectShop}
                                            className="text-xs font-open font-medium text-gray-500 hover:text-gray-900 px-2"
                                        >
                                            Cambiar
                                        </button>
                                    </div>
                                ) : (
                                    <>
                                        <div>Sin selecionar</div>
                                    </>
                                )
                                }
                            </div>
                            <ul className="flex w-full flex-col pb-3 px-4 items-start gap-1 content-center">
                                {links.map((link, index) => (
                                    <li key={index} className="w-full">
                                        {link.disabled ? (
                                            <div className="flex items-center justify-between gap-3 font-golos h-11 py-2 px-3 font- self-stretch text-sm text-gray-400 cursor-not-allowed">
                                                <div className="flex items-center gap-3">
                                                    {link.icon}
                                                    {link.name}
                                                </div>
                                                <IoLockClosed size={14} />
                                            </div>
                                        ) : (
                                            <Link href={link.href} className="flex items-center gap-3 font-golos h-11 py-2 px-3 font-medium self-stretch text-sm text-gray-500 hover:text-blue-600 rounded-lg cursor-pointer hover:bg-blue-100 transition duration-150 ease-linear">
                                                {link.icon}
                                                {link.name}
                                            </Link>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="flex py-0 px-4 pb-3 flex-col items-center gap-[10px] self-stretch">
                            <ul className="flex w-full flex-col px-4 items-start gap-1 content-center">
                                {linksFooter.map((link, index) => (
                                    <li key={index} className="w-full">
                                        {link.disabled ? (
                                            <div className="flex items-center gap-3 font-golos h-11 py-2 px-3 font-medium self-stretch text-sm text-gray-400 cursor-not-allowed">
                                                <IoLockClosed size={18} />
                                                {link.name}
                                            </div>
                                        ) : (
                                            <Link href={link.href} className="flex items-center gap-3 font-golos h-11 py-2 px-3 font-medium self-stretch text-sm text-gray-500 hover:text-blue-600 rounded-lg cursor-pointer hover:bg-blue-100 transition duration-150 ease-linear">
                                                {link.icon}
                                                {link.name}
                                            </Link>
                                        )}
                                    </li>
                                ))}
                            </ul>
                            <hr className="h-[1px] fill-[#e4e7ec] w-full" />
                            <p className="text-[#98a2b3] text-xs font-normal font-['Open Sans']">©2024 Dirocheck, v1.2</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}