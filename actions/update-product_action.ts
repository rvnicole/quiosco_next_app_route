"use server"

import { prisma } from "@/src/lib/prisma";
import { ProductSchema } from "@/src/schema";

export async function updateProduct(data: unknown, id: number) {
    try {
        const result = ProductSchema.safeParse(data);

        if(!result.success) {
            return {
                errors: result.error.issues
            }
        }

        await prisma.product.update({
            where: {
                id
            },
            data: result.data
        });
    }
    catch(error) {
        console.log(error);
    }
}