import Image from "next/image";
import Link from "next/link";

export default function CardTicker({logo, name, ticker, price}) {
    return (
        <>
            <Link href="/tesla">
                <a>
                    <div className="border border-gray-200 rounded px-5 py-4 mb-3 bg-white transition-all duration-200 shadow-sm hover:shadow-md">
                        <div className="flex items-center -mx-2">
                            <div className="px-2 flex items-center justify-center">
                                <Image
                                    src={logo}
                                    alt={name + ' logo'}
                                    width="30"
                                    height="30"
                                />
                            </div>
                            <div className="px-2 flex-1">
                                <h3 className="text-base text-gray-700">{name}</h3>
                                <h6 className="text-xs text-gray-500">{ticker}</h6>
                            </div>
                            <div className="px-2">
                                <span className="text-lg text-gray-700">{price}</span>
                            </div>
                        </div>
                    </div>
                </a>
            </Link>
        </>
    );
}
