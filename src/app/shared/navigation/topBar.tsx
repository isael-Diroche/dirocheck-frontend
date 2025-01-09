import Image from "next/image";
import Link from "next/link";
import { BiSearch, BiSidebar } from "react-icons/bi";
import { IoChevronDown, IoNotifications } from "react-icons/io5";
import ForwardBackButtons from "./ForwardBack";

import imagen from "@/public/favicon.ico";

// Component: NotificationButton
const NotificationButton = () => (
    <>
        <button
            className="flex justify-center items-center rounded-full hover:bg-blue-100 p-3 group transition duration-150 ease-in-out"
            aria-label="Notifications"
        >
            <IoNotifications className="fill-gray-600 group-hover:fill-blue-700" />
        </button>
    </>
);

// Component: SearchBar
const SearchBar = () => (
    <>
        <div className="relative w-[358px] h-full">
            <BiSearch
                className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400"
                aria-label="Search Icon"
            />
            <input
                type="text"
                placeholder="Search"
                className="pl-8 h-full w-full pr-3 py-2 border border-[#DDEDF3] rounded-lg focus:outline-none focus:ring-1 transition duration-150 ease-linear focus:ring-blue-500 placeholder:text-sm text-sm font-open placeholder:font-open font-medium placeholder:font-normal"
            />
        </div>
    </>
);

const TopBar = () => (
    <>
        {/* Top Bar */}
        <div className="flex h-10 items-center justify-between py-1 px-6 self-stretch">
            <div className="flex items-center gap-6 h-full">
                <Link href={"/"}>
                    <BiSidebar
                        className="size-[18px] fill-gray-800"
                        aria-label="Toggle Sidebar"
                    />
                </Link>
                <ForwardBackButtons />
                <hr className="rotate-90 w-[33px] h-px" />
                <SearchBar />
            </div>
            <div className="flex justify-center items-center gap-5">
                <NotificationButton />
                <div className="flex items-center gap-2">
                    <Image
                        src={imagen}
                        alt="User profile picture"
                        width={40}
                        height={40}
                        className="bg-gray-300 rounded-full border border-blue-050 shadow-sm"
                    />
                    <p className="font-inter text-sm font-medium text-gray-700">
                        Isael Diroche
                    </p>
                    <IoChevronDown />
                </div>
            </div>
        </div>
    </>
);

export default TopBar;