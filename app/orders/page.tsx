"use client"

import useSWR from "swr";
import LatestOrderItem from "@/components/order/LatestOrderItem";
import Logo from "@/components/ui/Logo";
import { OrderWithProducts } from "@/src/types";

export default function OrdersPage() {
    const url = '/orders/api';
    const fetcher = () => fetch(url)
                            .then(res => res.json())
                            .then(data => data);

    const {data, error, isLoading} = useSWR<OrderWithProducts []>(url, fetcher, {
        refreshInterval: 3000,
        revalidateOnFocus: false
    });

    if(data) return (
        <>
            <h1 className="text-center mt-20 text-6xl font-black">Ordenes Listas</h1>

            <Logo />

            {
                data.length ? (
                    <div className="grid grid-cols-1 gap-5 max-w-5xl mx-auto mt-10 md:grid-cols-2">
                        {
                            data.map(order => (
                                <LatestOrderItem 
                                    key={order.id}
                                    order={order}
                                />
                            ))
                        }
                    </div>
                ) : <p className="text-center my-10">No Hay Ordenes Listas</p>
            }
        </>
    )
}