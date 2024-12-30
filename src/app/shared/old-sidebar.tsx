"use client";

import Link from "next/link";
import Image from "next/image";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { LuUsers } from "react-icons/lu";
import {
    BiHomeAlt,
    BiLayer,
    BiPieChartAlt2,
    BiChevronRight,
    BiX,
    BiPlus,
    BiSolidDownArrow,
    BiSolidUpArrow,
    BiBarChartSquare,
    BiTask,
    BiCog,
    BiBuoy,
    BiChevronDown,
    BiArrowBack,
} from "react-icons/bi";
import React, { useState } from "react";

const links = [
    {
        icon: <BiHomeAlt size={22} />,
        name: "Inicio",
        href: "/",
    },
    {
        icon: <LuUsers size={22} />,
        name: "Clientes",
        href: "/customers",
    },
    {
        icon: <BiTask size={22} />,
        name: "Inventarios",
        href: "/inventory",
    },
    {
        icon: <BiPieChartAlt2 size={22} />,
        name: "Reportes",
        href: "/reporting",
        subsections: [
            { name: "Junio 21-24", href: "/report/34243132" },
            { name: "Julio 13-24", href: "/report/43545656" },
        ],
    },
    {
        icon: <BiBarChartSquare size={22} />,
        name: "Tablero",
        href: "/dashboard",
    },
    {
        icon: <BiLayer size={22} />,
        name: "Proyectos",
        href: "/projects",
    },
];

const footer_links = [
    {
        icon: <BiBuoy size={22} />,
        name: "Soporte",
        href: "/support",
    },
    {
        icon: <BiCog size={22} />,
        name: "Configuración",
        href: "/settings",
    },
];

export default function OldSidebar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false); // Manejar si el dropdown está abierto
    const [selectedBusiness, setSelectedBusiness] = useState(""); // Manejar el negocio seleccionado
    const [isProjectsDropdownOpen, setProjectsDropdownOpen] = useState(false);
    const [isBusinessDropdownOpen, setBusinessDropdownOpen] = useState(false);

    const handleBusinessChange = (value: React.SetStateAction<string>) => {
        setSelectedBusiness(value);
        if (value === "create-new") {
            // Aquí puedes agregar la lógica para crear un nuevo negocio
            console.log("Crear nuevo negocio");
        }
        setIsOpen(false); // Cierra el dropdown después de seleccionar una opción
    };

    const toggleDropdown = () => {
        setIsOpen(!isOpen); // Alternar la visibilidad del dropdown
    };

    const toggleProjectsDropdown = () => {
        setProjectsDropdownOpen(!isProjectsDropdownOpen);
    };

    const toggleBusinessDropdown = () => {
        setBusinessDropdownOpen(!isBusinessDropdownOpen);
    };

    const businesses = [
        { name: "Ferreteria Santana I", href: "/business-a" },
        { name: "Ferreteria Santana II", href: "/business-b" },
        { name: "Bisuteria y mas R&R", href: "/business-c" },
    ];

    return (
        <div className="flex flex-col h-screen w-[324px] justify-around">
            <div className="flex flex-col flex-1 overflow-y-auto">
                <div className="flex items-center justify-between p-4">
                    <div className="flex items-center space-x-2">
                        <Image
                            src="/images/logo.png"
                            width={32}
                            height={32}
                            alt="DiroCheck logo"
                            className="size-10 bg-gray-400 rounded-full"
                        />
                        <p className="text-lg font-semibold">DiroCheck System</p>
                    </div>
                </div>

                {/* Menú principal */}
                {/* <div className="px-4 py-2">
                    <Link
                        href="/"
                        className="flex items-center px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-200"
                    >
                        <BiArrowBack size={22} />
                        <p className="ml-2">Menú principal</p>
                    </Link>
                </div> */}
                {/* <hr className="mt-2 mb-4" /> */}

                {/* Selector de negocios */}
                <div className="px-4 py-2 mb-4">
                    <div className="relative">
                        <label
                            htmlFor="business-button"
                            className={clsx(
                                "absolute z-10 -top-3 left-3 bg-white px-2 text-sm font-medium font-sans",
                                {
                                    "text-blue-500": isOpen, // Cambia el color del label cuando el botón está enfocado
                                    "text-gray-500": !isOpen, // Color predeterminado
                                }
                            )}
                        >
                            Negocio
                        </label>
                        <button
                            id="business-button"
                            onClick={toggleDropdown}
                            className="relative block hover:ring focus:ring-blue-500 w-full px-4 py-3 pl-6 text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring"
                        >
                            <div className="flex items-center justify-between">
                                {/* Aqui se define cual negocio se mostrara en el button  */}
                                <span>{selectedBusiness || "Seleccionar negocio"}</span>
                                {isOpen ? (
                                    <BiSolidDownArrow
                                        size={12}
                                        className="text-gray-500 transition-transform duration-300 rotate-180"
                                    />
                                ) : (
                                    <BiSolidDownArrow
                                        size={12}
                                        className="text-gray-500 transition-transform duration-300"
                                    />
                                )}
                            </div>
                        </button>
                        {isOpen && (
                            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg pb-2 px-2 pt-1">
                                <button
                                    onClick={() => alert("Evento de crear nuevo inventario")}
                                    className="flex items-center gap-1 w-full px-4 py-2 text-blue-600 font-semibold text-left rounded-t-lg hover:bg-gray-100"
                                >
                                    <BiPlus />
                                    Crear nuevo negocio
                                </button>
                                {businesses.map((business) => (
                                    <button
                                        key={business.href}
                                        onClick={() => handleBusinessChange(business.name)}
                                        className="block w-full px-4 py-3 text-gray-700 text-left hover:bg-gray-100"
                                    >
                                        {business.name}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <div className="px-4 py-2 hidden">
                    <div className="relative flex items-center w-full h-11 rounded-lg shadow focus-within:shadow-lg bg-white overflow-hidden border border-gray-300">
                        <div className="grid place-items-center h-full w-12 text-gray-300">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                            </svg>
                        </div>
                        <input
                            className="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
                            type="text"
                            id="search"
                            placeholder="Search something.."
                        />
                    </div>
                </div>
                <div className="px-4">
                    {links.map((link) => {
                        const isActive = pathname === link.href;
                        const isDropdownActive = link.subsections && isProjectsDropdownOpen;

                        if (link.subsections) {
                            return (
                                <div key={link.name} className="mb-4">
                                    <div
                                        onClick={toggleProjectsDropdown}
                                        className={clsx(
                                            "flex items-center justify-between px-4 py-3 rounded-lg cursor-pointer",
                                            {
                                                "text-white bg-blue-500": isActive,
                                                "text-gray-700 hover:bg-gray-200": !isActive,
                                            }
                                        )}
                                    >
                                        <div className="flex items-center space-x-2">
                                            {link.icon}
                                            <p>{link.name}</p>
                                        </div>
                                        <BiChevronDown
                                            size={22}
                                            className={clsx(
                                                "transform transition-transform duration-300",
                                                {
                                                    "rotate-90": isDropdownActive,
                                                }
                                            )}
                                        />
                                    </div>
                                    {isDropdownActive && (
                                        <div className="ml-4">
                                            {link.subsections.map((sub) => (
                                                <Link
                                                    href={sub.href}
                                                    key={sub.name}
                                                    className={clsx("block py-2 px-4 rounded-lg", {
                                                        "text-blue-500": pathname === sub.href,
                                                        "text-gray-700 hover:bg-gray-200":
                                                            pathname !== sub.href,
                                                    })}
                                                >
                                                    {sub.name}
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            );
                        } else {
                            return (
                                <div key={link.name} className="mb-2">
                                    <Link
                                        href={link.href}
                                        key={link.name}
                                        className={clsx("flex items-center px-4 py-3 rounded-lg", {
                                            "text-white bg-blue-500": isActive,
                                            "text-gray-700 hover:bg-gray-200": !isActive,
                                        })}
                                    >
                                        {link.icon}
                                        <p className="ml-2">{link.name}</p>
                                    </Link>
                                </div>
                            );
                        }
                    })}
                </div>
            </div>

            <div className="border-t p-4">
                <div className="space-y-4">
                    {footer_links.map((link) => {
                        return (
                            <Link
                                href={link.href}
                                key={link.name}
                                className={clsx("flex items-center px-4 py-3 rounded-lg", {
                                    "text-white bg-blue-500": pathname === link.href,
                                    "text-gray-700 hover:bg-gray-200": pathname !== link.href,
                                })}
                            >
                                {link.icon}
                                <p className="ml-2">{link.name}</p>
                            </Link>
                        );
                    })}
                </div>

                <hr className="my-4" />
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <div className="h-10 w-10 bg-gray-300 rounded-full overflow-hidden">
                            {/* <Image
                src={
                  "https://pkimgcdn.peekyou.com/08545e176593c5fa40c9baa7d7fbe118.jpeg"
                }
                alt={"Profile imagen"}
                width={40}
                height={40}
              /> */}
                        </div>
                        <div>
                            <h5 className="font-semibold self-stretch">Isael Diroche</h5>
                            <p className="text-sm text-gray-500 self-stretch">
                                idiroche@gmai.com
                            </p>
                        </div>
                    </div>
                    <button className="flex-shrink-0">
                        <BiChevronRight size={22} />
                    </button>
                </div>
            </div>
        </div>
    );
}
