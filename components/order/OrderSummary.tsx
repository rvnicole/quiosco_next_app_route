"use client"

import { useMemo } from "react";
import { useStore } from "@/src/store";
import ProductDetails from "../products/ProductDetails";
import { formatCurrency } from "@/utils";
import { createOrder } from "@/actions/create-order-action";
import { OrderSchema } from "@/src/schema";
import { toast } from "react-toastify";

export default function OrderSummary() {
    const order = useStore((state) => state.order);
    const clearOrder = useStore((state) => state.clearOrder);
    const total = useMemo(() => order.reduce((total, item) => total + (item.quantity * item.price), 0), [order]);

    const handleCreateOrder = async (formData: FormData) => {
        const data = {
            name: formData.get('name'),
            total,
            order
        };

        const result = OrderSchema.safeParse(data);        
        if(!result.success) {
            result.error.issues.forEach(error => {
                toast.error(error.message);
            });

            return;
        }

        const response = await createOrder(data);
        if(response?.errors) {
            response.errors.forEach(error => {
                toast.error(error.message);
            });
        }

        toast.success("Pedido Realizado Correctamente");
        clearOrder();
    }

    return (
        <aside className="lg:h-screen lg:overflow-y-scroll md:w-64 lg:w-96 p-5 ">
            <h1 className="text-4xl text-center font-black">Mi Pedido</h1>

            {
                order.length === 0 ? (
                    <p className="text-center my-10">El carrito esta vacio</p>
                ) : (
                    <div className="mt-5 p-3 bg-white shadow rounded-lg">
                        <div 
                            className="overflow-y-auto h-[54vh]"
                            style={{ scrollbarWidth: "thin"}}
                        >
                            {
                                order.map( product => (
                                    <ProductDetails 
                                        key={product.id}
                                        item={product}
                                    />
                                ))
                            }
                        </div>
                        
                        <div className="border-t border-dotted">
                            <p className="text-2xl text-center font-black text-gray-700 my-5">
                                Total a pagar: {''}
                                <span className="text-2xl text-amber-500 font-black">
                                    {formatCurrency(total)}
                                </span>
                            </p>

                            <form 
                                className="w-full space-y-3"
                                action={handleCreateOrder}
                            >
                                <input 
                                    type="text"
                                    placeholder="Tu Nombre"
                                    className="bg-white border border-gray-200 p-2 rounded-lg w-full"
                                    name="name"
                                />

                                <input 
                                    type="submit"
                                    value="Confirmar Pedido"
                                    className="py-2 rounded-lg uppercase text-white bg-black w-full text-center cursor-pointer font-bold hover:bg-amber-500"
                                />
                            </form>
                        </div>
                    </div>
                )
            }
        </aside>
    )
}