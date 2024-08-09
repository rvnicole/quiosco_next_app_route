import ProductSearchForm from "@/components/products/ProductSearchForm";
import ProductTable from "@/components/products/ProductTable";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";

async function searchProducts(searchTerms: string) {
    const products = await prisma.product.findMany({
        where: {
            name: {
                contains: searchTerms,
                mode: 'insensitive'
            }
        },
        include: {
            category: true
        }
    });

    return products;
}

export default async function SearchPage({searchParams}: {searchParams: {search: string}}) {
    const products = await searchProducts(searchParams.search);

    return (
        <>
            <Heading>Página de Busqueda</Heading>

            <div className="flex flex-col lg:flex-row lg:justify-between gap-5">
                <p></p>
                <ProductSearchForm />
            </div>

            {
                products.length ? (
                    <ProductTable 
                        products={products}
                    />
                ) : <p className="text-center text-lg">No hay resultados</p>
            }
        </>
    )
}