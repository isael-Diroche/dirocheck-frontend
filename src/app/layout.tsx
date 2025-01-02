import type { Metadata } from "next";
import "./globals.scss";
import Sidebar from "@/app/shared/sidebar";
import Image from "next/image";
import { BiSidebar, BiArrowBack, BiSearch } from "react-icons/bi";
import { IoChevronDown, IoNotifications } from "react-icons/io5";

import { Inter } from "next/font/google";

import imagen from "@/app/favicon.ico";
import ForwardBackButtons from "./shared/navigation/ForwardBack";
import Link from "next/link";

const inter = Inter({
    variable: "--font-inter",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "DiroCheck",
    description: "Gestiona tu negocio rapido y seguro",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${inter.variable} ${inter.variable} antialiased bg-[#F6F7FA]`} >
                <div className="flex gap-0 items-center">
                    <Sidebar />
                    <div className="w-full h-screen flex flex-col items-start gap-2 self-stretch pt-2">
                        <div className="flex h-10 items-center justify-between py-1 px-6 self-stretch">
                            <div className="flex items-center gap-6 h-full">
                                <Link href={"/"}>
                                    <BiSidebar className="size-[18px] fill-gray-800" />
                                </Link>
                                <ForwardBackButtons />
                                <hr className="rotate-90 w-[33px] h-px" />

                                <div className="relative w-[358px] h-full">
                                    <BiSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Search"
                                        className="pl-8 h-full w-full pr-3 py-2 border border-[#DDEDF3] rounded-lg focus:outline-none focus:ring-1 transition duration-150 ease-linear focus:ring-blue-500 placeholder:text-sm text-sm font-open placeholder:font-open font-medium placeholder:font-normal"
                                    />
                                </div>
                            </div>
                            <div className="flex justify-center items-center gap-5">
                                <button className="flex justify-center items-center rounded-full hover:bg-blue-100 p-3 group transition duration-150 ease-in-out">
                                    <IoNotifications className="fill-gray-600 group-hover:fill-blue-700" />
                                </button>
                                <div className="flex items-center gap-2">
                                    <Image src={imagen} alt="Description" width={40} height={40} className="bg-gray-300 rounded-full border border-blue-050 shadow-sm" />
                                    <p className="font-inter text-sm font-medium text-gray-700">Isael Diroche</p>
                                    <IoChevronDown />
                                </div>
                            </div>
                        </div>
                        <div className="flex h-full w-full p-6 flex-col items-start gap-4 rounded-tl-xl bg-white border border-[#DFDFDF] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] overflow-y-scroll">
                            {children}
                        </div>
                    </div>
                </div>
            </body>
        </html>
    );
}
