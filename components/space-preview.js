import Link from 'next/link'
import Image from "next/image";

export default function SpacePreview({
                                         name,
                                         ticker,
                                         slug,
                                         excerpt,
                                         icon
                                     }) {
    return (
        <>
            <Link as={`/spaces/${slug}`} href="/spaces/[slug]">
                <a className="block shadow bg-white rounded transition hover:shadow-md h-full">
                    <div className="flex items-center -mx-2 p-4 pb-3">
                        <div className="flex-initial px-2">
                            <Image
                                src={icon.url}
                                alt={name + ' logo'}
                                width="20"
                                height="20"
                            />
                        </div>
                        <div className="flex-1 px-2">
                            <h3 className="text-xl leading-snug font-semibold text-gray-700">
                                {name} <span className="text-gray-300 font-semibold text-xs">- {ticker}</span>
                            </h3>
                        </div>
                    </div>
                    <hr/>
                    <p className="text-xs leading-relaxed text-gray-400 p-4">{excerpt}</p>
                </a>
            </Link>
        </>
    )
}
