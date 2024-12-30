import Link from "next/link";
import { IoIosAlbums, IoIosArchive, IoMdContact, IoMdCube } from "react-icons/io";
import { IoDocumentText, IoReceipt, IoBarChart, IoSettings } from "react-icons/io5";


const links = [
    {
        name: "Tablero",
        href: "/dashboard",
        icon: <IoIosAlbums size={18} />
    },
    {
        name: "Productos",
        href: "/products",
        icon: <IoMdCube size={18} />
    },
    {
        name: "Inventarios",
        href: "/inventory",
        icon: <IoDocumentText size={18} />
    },
    {
        name: "Facturas",
        href: "/invoices",
        icon: <IoReceipt size={18} />
    },
    {
        name: "Otros",
        href: "/others",
        icon: <IoBarChart size={18} />
    },
]

const linksFooter = [
    {
        name: "Soporte",
        href: "/support",
        icon: <IoMdContact size={18} />
    },
    {
        name: "Configuración",
        href: "/settings",
        icon: <IoSettings size={18} />
    },
]

export default function OldSidebar() {

    return (
        <>
            <div className="flex w-[293px] flex-col justify-between items-center shrink-0 self-stretch pt-2">
                <div className="flex h-full flex-col items-start self-stretch">
                    <div className="flex h-full flex-col justify-between items-start self-stretch">
                        <div className="flex flex-col items-start gap-6 self-stretch">
                            <div className="flex py-2 px-6 items-center gap-[10px] self-stretch">

                            </div>
                            <div className="flex px-[14px] flex-col items-start gap-4 self-stretch">

                            </div>
                            <ul className="flex w-full flex-col pb-3 px-4 items-start gap-1 content-center">
                                {links.map((link, index) => (
                                    <li key={index} className="w-full">
                                        <Link href={link.href} className="flex items-center gap-3 font-golos h-11 py-2 px-3 font-medium self-stretch text-sm text-gray-500 hover:text-blue-600 rounded-lg cursor-pointer hover:bg-blue-100 transition duration-150 ease-linear">
                                            {link.icon}
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="flex py-0 px-4 pb-3 flex-col items-center gap-[10px] self-stretch">
                            <ul className="flex w-full flex-col px-4 items-start gap-1 content-center">
                                {linksFooter.map((link, index) => (
                                    <li key={index} className="w-full">
                                        <Link href={link.href} className="flex items-center gap-3 font-golos h-11 py-2 px-3 font-medium self-stretch text-sm text-gray-500 hover:text-blue-600 rounded-lg cursor-pointer hover:bg-blue-100 transition duration-150 ease-linear">
                                            {link.icon}
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                            <hr className="h-[1px] fill-[#e4e7ec] w-full" />
                            <p className="text-[#98a2b3] text-xs font-normal font-['Open Sans']">©2024 Vantar, v1.29-beta</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}