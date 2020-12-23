import Link from "next/link";
import Image from "next/image";

export default function TickerIcon({icon, name, link}) {
    return (
        <>
            <Link href={link}>
                <a className="shadow-sm border bg-white rounded-full w-10 h-10 p-2 flex items-center justify-center mb-2">
                    <Image
                        src={icon}
                        alt={name + ' logo'}
                        width="20"
                        height="20"
                    />
                </a>
            </Link>
        </>
    );
}
