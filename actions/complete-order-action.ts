"use server"

import { OrderIdSchema } from "@/src/schema";
import { prisma } from "@/src/lib/prisma"; 
import { revalidatePath } from "next/cache";

export async function completeOrder(formData: FormData) {
    try {
        const orderId = formData.get('order_id')!;
        const data = { orderId };

        const result = OrderIdSchema.safeParse(data);

        if(result.success) {
            await prisma.order.update({
                where: {
                    id: result.data.orderId
                },
                data: {
                    status: true,
                    orderReadyAt: new Date(Date.now())
                }
            });

            revalidatePath('/admin/orders');
        }
    }
    catch(error) {
        console.log(error);
    }
}
