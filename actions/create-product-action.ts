"use server"

import { prisma } from "@/src/lib/prisma";
import { ProductSchema } from "@/src/schema";

export async function createProduct(data: unknown) {
    try {
        const result = ProductSchema.safeParse(data);

        if(!result.success) {
            return {
                errors: result.error.issues
            }
        }

        await prisma.product.create({
            data: result.data
        });
    }
    catch(error) {
        console.log(error);
    }
}