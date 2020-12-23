const SPACE_GRAPHQL_FIELDS = `
name
ticker
slug
excerpt
icon {
  url
}
`

async function fetchGraphQL(query, preview = false) {
    return fetch(
        `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${
                    preview
                        ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
                        : process.env.CONTENTFUL_DELIVERY_ACCESS_TOKEN
                }`,
            },
            body: JSON.stringify({ query }),
        }
    ).then((response) => response.json())
}

function extractPost(fetchResponse) {
    return fetchResponse?.data?.postCollection?.items?.[0]
}

function extractSpaceEntries(fetchResponse) {
    return fetchResponse?.data?.spaceCollection?.items
}

export async function getPreviewSpaceBySlug(slug) {
    const entry = await fetchGraphQL(
        `query {
      postCollection(where: { slug: "${slug}" }, preview: true, limit: 1) {
        items {
          ${SPACE_GRAPHQL_FIELDS}
        }
      }
    }`,
        true
    )
    return extractPost(entry)
}


export async function getAllSpacesWithSlug() {
    const entries = await fetchGraphQL(
        `query {
      postCollection(where: { slug_exists: true }, order: date_DESC) {
        items {
          ${SPACE_GRAPHQL_FIELDS}
        }
      }
    }`
    )
    return extractSpaceEntries(entries)
}

export async function getAllSpacesForHome(preview) {
    const entries = await fetchGraphQL(
        `query {
      spaceCollection(preview: ${preview ? 'true' : 'false'}) {
        items {
          ${SPACE_GRAPHQL_FIELDS}
        }
      }
    }`,
        preview
    )
    return extractSpaceEntries(entries)
}

export async function getPostAndMorePosts(slug, preview) {
    const entry = await fetchGraphQL(
        `query {
      postCollection(where: { slug: "${slug}" }, preview: ${
            preview ? 'true' : 'false'
        }, limit: 1) {
        items {
          ${SPACE_GRAPHQL_FIELDS}
        }
      }
    }`,
        preview
    )
    const entries = await fetchGraphQL(
        `query {
      postCollection(where: { slug_not_in: "${slug}" }, order: date_DESC, preview: ${
            preview ? 'true' : 'false'
        }, limit: 2) {
        items {
          ${SPACE_GRAPHQL_FIELDS}
        }
      }
    }`,
        preview
    )
    return {
        post: extractPost(entry),
        morePosts: extractSpaceEntries(entries),
    }
}
