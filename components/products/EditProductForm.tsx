"use client"

import { ProductSchema } from "@/src/schema";
import { toast } from "react-toastify";
import { useRouter, useParams } from "next/navigation";
import { updateProduct } from "@/actions/update-product_action";

export default function EditProductForm({children}: {children: React.ReactNode}) {
    const router = useRouter();
    const params = useParams();
    const id = +params.id!;

    const handleSubmit = async (formData: FormData) => {
        const data = {
            name: formData.get('name'),
            price: formData.get('price'),
            categoryId: formData.get('categoryId'),
            image: formData.get('image') || ''
        };

        const result = ProductSchema.safeParse(data);

        if(!result.success) {
            result.error.issues.forEach(error => {
                toast.error(error.message)
            });

            return;
        }

        const response = await updateProduct(result.data, id);
        if(response?.errors) {
            response.errors.forEach(error => {
                toast.error(error.message)
            });

            return;
        }

        toast.success('Producto Actualizado Correctamente');
        router.push('/admin/products');
    }

    return (
        <div className="bg-white mt-10 px-5 py-10 rounded-lg shadow-md max-w-3xl mx-auto">
            <form 
                className="space-y-5"
                action={handleSubmit}
            >
                {children}

                <input 
                    type="submit"
                    className="bg-indigo-600 hover:bg-indigo-800 text-white w-full p-3 mt-5 uppercase font-bold cursor-pointer rounded-lg"
                    value='Guardar Cambios'
                />
            </form>
        </div>
    )
}