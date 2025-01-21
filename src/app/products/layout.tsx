export default function ProductsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex w-full h-full flex-col ">
            <h1 className="text-2xl font-golos font-semibold text-gray-800">Productos del negocio</h1>
            {children}
        </div>
    );
}
