"use server"

import { OrderSchema } from "@/src/schema";
import { prisma } from "@/src/lib/prisma";

export async function createOrder(data: unknown) {
    try {
        const result = OrderSchema.safeParse(data);

        if(!result.success) {
            return {
                errors: result.error.issues
            }
        }

        await prisma.order.create({
            data: {
                name: result.data.name,
                total: result.data.total,
                orderProducts: {
                    create: result.data.order.map(product => ({
                        productId: product.id,
                        quantity: product.quantity
                    }))
                }
            }
        });

        
    }
    catch(error) {
        console.log(error);
    }
}