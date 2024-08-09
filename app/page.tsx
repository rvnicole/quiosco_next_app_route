import Logo from "@/components/ui/Logo";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col max-w-lg mx-auto">
      <Logo />
      <Link
        className="bg-amber-400 hover:opacity-90 w-1/2 text-xl px-10 py-3 text-center font-bold cursor-pointer rounded-lg mx-auto my-10"
        href={`/order/cafe`}
      >
        Iniciar Pedido
      </Link>
    </div>
  )
}
