import Link from "next/link"

type ProductPaginationProps = {
    page: number,
    totalPages: number
}

export function ProductsPagination({ page, totalPages }: ProductPaginationProps) {
    const pages = Array.from({length: totalPages}, ( _ , i) => i + 1);

    return (
        <nav className="flex justify-center py-10">
            <Link
                className={page > 1 ? "bg-white hover:bg-amber-500 font-bold p-2 rounded-lg mx-1" : "bg-white text-gray-400 font-bold p-2 rounded-lg mx-1"}
                href={(page - 1) === 0 ? "" : `/admin/products?page=${(page - 1)}`}
            >
                &laquo;
            </Link>

            {
                pages.map(numberPage => (
                    <Link
                        key={numberPage}
                        className={ page === numberPage ? "bg-white hover:bg-amber-500 font-bold p-2 rounded-lg mx-1 px-3 border-2 border-amber-500" : "bg-white hover:bg-amber-500 font-bold p-2 rounded-lg mx-1 px-3"}
                        href={`/admin/products?page=${numberPage}`}
                    >
                        {numberPage}
                    </Link>
                ))
            }

            <Link
                className={page < totalPages ? "bg-white hover:bg-amber-500 font-bold p-2 rounded-lg mx-1" : "bg-white text-gray-400 font-bold p-2 rounded-lg mx-1"}
                href={(page + 1) > totalPages ? "" : `/admin/products?page=${(page + 1)}`}
            >
                &raquo;
            </Link>
        </nav>
    )
}