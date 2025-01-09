// 'use client'

// import React, { useEffect, useState } from 'react';
// import { ShopService } from '../lib/service';
// import { Shop } from "@/app/shop/lib/model";
// import { motion } from 'framer-motion';
// import { BsInfoCircleFill } from "react-icons/bs";

// const shopService = new ShopService();

// const ShopCreate: React.FC = () => {
//     const [shops, setShops] = useState<Shop[]>([]);
//     const [newShop, setNewShop] = useState<Shop>({
//         id: "0",
//         name: '',
//         address: '',
//         type: ''
//     });
//     const [showPopup, setShowPopup] = useState(false);

//     const popupVariants = {
//         hidden: { opacity: 0, y: -50 },
//         visible: { opacity: 1, y: 0 },
//     };

//     const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const { name, value } = e.target;
//         setNewShop({ ...newShop, [name]: value });
//     };

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         try {
//             const createdShop = await shopService.createShop(newShop);
//             setShops([...shops, createdShop]);
//             setNewShop({
//                 id: "0",
//                 name: '',
//                 address: '',
//                 type: ''
//             });
//             setShowPopup(true);
//             setTimeout(() => setShowPopup(false), 3000);
//         } catch (error) {
//             console.error('Error creating shop:', error);
//         }
//     };

//     useEffect(() => {
//         const fetchShops = async () => {
//             try {
//                 const fetchedShops = await shopService.getAllShop();
//                 setShops(fetchedShops);
//             } catch (error) {
//                 console.error('Error fetching shops:', error);
//             }
//         };
//         fetchShops();
//     }, []);

//     return (
//         <div>
//             {showPopup && (
//                 <motion.div
//                     className="fixed flex justify-center items-center top-3 left-0 right-0"
//                     initial="hidden"
//                     animate="visible"
//                     exit="hidden"
//                     variants={popupVariants}
//                     transition={{ duration: 0.5 }}
//                 >

//                     <div className="md:w-1/3 sm:w-full rounded-lg shadow-slate-100 shadow-lg bg-blue-100 border border-blue-200 my-3">
//                         <div className="flex justify-between px-5 py-4">
//                             <div className='flex items-center gap-3'>
//                                 <BsInfoCircleFill className='fill-blue-400 size-6' />
//                                 <span className="text-gray-600 font-inter font-normal text-base">Negocio creado correctamente.</span>
//                             </div>
//                             <div>
//                                 <button
//                                     className="text-xs py-2 px-3 text-gray-800 font-medium hover:text-gray-600 transition duration-150 font-inter"
//                                     onClick={() => setShowPopup(false)}
//                                 >
//                                     Cerrar
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 </motion.div>
//             )}

//             <form onSubmit={handleSubmit} className="">
//                 <h2 className="text-2xl font-bold mb-4">Add New Shop</h2>
//                 <div className="mb-4">
//                     <label className="block text-sm font-medium text-gray-700">Name</label>
//                     <input
//                         type="text"
//                         name="name"
//                         value={newShop.name}
//                         onChange={handleInputChange}
//                         className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
//                     />
//                 </div>
//                 <div className="mb-4">
//                     <label className="block text-sm font-medium text-gray-700">Address</label>
//                     <input
//                         type="text"
//                         name="address"
//                         value={newShop.address}
//                         onChange={handleInputChange}
//                         className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
//                     />
//                 </div>
//                 <button
//                     type="submit"
//                     className="w-full py-2 bg-blue-500 text-white rounded-md font-semibold hover:bg-blue-600"
//                 >
//                     Add Shop
//                 </button>
//             </form>
//         </div>
//     );
// };

// export default ShopCreate;
