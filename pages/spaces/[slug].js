import { useRouter } from 'next/router'

export default function Space({ post, morePosts, preview }) {
    const router = useRouter()

    if (!router.isFallback && !post) {
        return <ErrorPage statusCode={404} />
    }

    return (
        <Layout preview={preview}>
            <Container>
            </Container>
        </Layout>
    )
}

// export async function getStaticProps({ params, preview = false }) {
//     const data = await getPostAndMorePosts(params.slug, preview)
//
//     return {
//         props: {
//             preview,
//             post: data?.post ?? null,
//             morePosts: data?.morePosts ?? null,
//         },
//     }
// }
//
// export async function getStaticPaths() {
//     const allPosts = await getAllPostsWithSlug()
//     return {
//         paths: allPosts?.map(({ slug }) => `/posts/${slug}`) ?? [],
//         fallback: true,
//     }
// }
