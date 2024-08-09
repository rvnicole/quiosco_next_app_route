import { PrismaClient } from "@prisma/client";
import CategoryIcon from "../ui/CategoryIcon";
import Logo from "../ui/Logo";

const prismaClient = new PrismaClient();

async function getCategories() {
   return await prismaClient.category.findMany();
}

export default async function OrderSidebar() {
    const categories = await getCategories();

    return (
        <aside 
            className="md:w-72 bg-white md:h-screen md:overflow-y-scroll"
            style={{ scrollbarWidth: "thin"}}
        >
            <Logo />

            <nav className="mt-10">
                {
                    categories.map(category => (
                        <CategoryIcon 
                            key={category.id} 
                            category={category}
                        />
                    ))
                }
            </nav>
        </aside>
    )
}