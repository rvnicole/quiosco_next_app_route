import Image from "next/image";

export default function Logo() {
    return (
        <div className="flex justify-center mt-5">
            <div className="relative w-36 h-36">
                <Image 
                    fill
                    priority
                    alt="Logotipo Fresh Coffee"
                    src={'/logo.svg'}
                />
            </div>
        </div>
    )
}