import Container from '../components/container'
import Layout from '../components/layout'
import Head from 'next/head'
import {getAllSpacesForHome} from "../lib/api";
import SpacePreview from "../components/space-preview";

export default function Index({preview, allSpaces}) {
    return (
        <>
            <Layout preview={preview}>
                <Head>
                    <title>tickr | Mumsnet for stocks</title>
                </Head>
                <Container>
                    <div className="pt-4 pr-12 pl-12 max-w-4xl mx-auto relative">

                        <h2 className="text-sm text-left font-semibold text-gray-300 mb-4">Featured spaces</h2>
                        <div className="flex flex-wrap relative z-5 -mx-2">
                            {allSpaces.map((space) => (
                                <div key={space.slug} className="w-1/2 px-2 mb-4">
                                    <SpacePreview
                                        name={space.name}
                                        ticker={space.ticker}
                                        slug={space.slug}
                                        icon={space.icon}
                                        excerpt={space.excerpt}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </Container>
            </Layout>
        </>
    )
}

export async function getStaticProps({preview = false}) {
    const allSpaces = (await getAllSpacesForHome(preview)) ?? []

    return {
        props: {preview, allSpaces},
    }
}
