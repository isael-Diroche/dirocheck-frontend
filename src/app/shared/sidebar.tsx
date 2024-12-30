import Link from "next/link";
import { IoIosAlbums, IoIosArchive, IoMdCube } from "react-icons/io";
import { IoDocumentText, IoReceipt, IoBarChart } from "react-icons/io5";


const links = [
    {
        name: "Dashboard",
        href: "/dashboard",
        icon: <IoIosAlbums size={18} />
    },
    {
        name: "Productos",
        href: "/productos",
        icon: <IoMdCube size={18} /> 
    },
    {
        name: "Inventarios",
        href: "/inventarios",
        icon: <IoDocumentText size={18} />
    },
    {
        name: "Facturas",
        href: "/facturas",
        icon: <IoReceipt size={18} />
    },
    {
        name: "Otros",
        href: "/otros",
        icon: <IoBarChart size={18} />
    },
]

{/* 
    <IoMdContact />
    <IoMdHelpCircle />
    
*/}


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
                        <div className="flex py-0 px-4 flex-col items-center gap-[10px] self-stretch">
                            Footer
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}