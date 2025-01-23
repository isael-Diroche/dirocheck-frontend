import { StaticImageData } from "next/image";

export type Shop = {
    id: string
    name: string
    address: string
    image?: File;
    created_at?: Date
    updated_at?: Date
    contact_number?: string
    type?: string | "none"
}
