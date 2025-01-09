import "@/styles/globals.scss";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { ShopProvider } from "@/app/shop/ShopContext";
import Sidebar from "@/app/shared/navigation/sideBar"

const inter = Inter({
    variable: "--font-inter",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "DiroCheck",
    description: "Gestiona tu negocio rápido y seguro",
};

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <html lang="en">
            <body className={`${inter.variable} antialiased bg-[#F6F7FA]`}>
                <ShopProvider>
                    <div className="flex gap-0 items-center">
                        <Sidebar />
                        <div className="w-full h-screen flex flex-col items-start gap-2 self-stretch pt-2">
                            {/* Main Content */}
                            <div className="flex h-full w-full p-6 flex-col items-start gap-4 rounded-tl-xl bg-white border border-[#DFDFDF] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] overflow-y-scroll">
                                {children}
                            </div>
                        </div>
                    </div>
                </ShopProvider>
            </body>
        </html>
    );
};

export default RootLayout;
