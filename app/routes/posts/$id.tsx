import { createFileRoute } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start';


const getPostFn = createServerFn({ type: 'dynamic', method: 'GET' })
    .validator((data: number) => {
        console.log('Validating post ID:', data);
        if (!data) {
            throw new Error('Post ID is required');
        }
        return data;
    })
    .handler(async ({ data }) => {
        console.log('Fetching post with ID:', data);
        const response = await fetch("https://jsonplaceholder.typicode.com/posts/" + data);
        if (!response.ok) {
            throw new Error('Failed to fetch post');
        }
        const post = await response.json();
        return post;
    });


export const Route = createFileRoute('/posts/$id')({
    component: RouteComponent,
    loader: ({ params }) => {
        console.log('Loading post with ID:', params.id);
        if (!params.id) {
            throw new Error('Post ID is required');
        }
        const post = getPostFn({ data: Number(params.id) });
        return post;
    },
    head: ({ loaderData }) => {
        return {
            meta: [{
                title: `Post ${loaderData?.title}`,
                description: `Details about post ${loaderData?.id}`,
                keywords: `post, ${loaderData?.title}`,
            }]
        };
    }
})

function RouteComponent() {
    const params = Route.useParams();
    // You can use the data returned by the loader here
    // For example, you can display the post ID
    const post = Route.useLoaderData();


    return <div>
        <h1>Prerendered: {`/posts/${params.id}`}</h1>
        <h2>Preloaded: {post?.title}</h2>
    </div>
}
