"use client"

import { useStore } from "@/src/store";
import { Product } from "@prisma/client";

type AddProductButtonProps = {
    product: Product
}

export default function AddProductButton({ product }: AddProductButtonProps) {
    const addToCart = useStore((state) => state.addToCart);

    return (
        <button
            type="button"
            className="bg-indigo-600 hover:bg-indigo-800 rounded-lg text-white w-full mt-5 p-5 uppercase font-bold cursor-pointer"
            onClick={() => addToCart(product)}
        >
            Agregar
        </button>
    )
}