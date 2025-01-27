
export type Shop = {
    id: string
    name: string
    address: string
    image: File | null;
    created_at?: Date
    updated_at?: Date
    contact_number?: string
    type?: string | "none"
}
