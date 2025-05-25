import { defineConfig } from '@tanstack/react-start/config';
import tsConfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  vite: {
    plugins: [
      tsConfigPaths({
        projects: ['./tsconfig.json'],
      }),
    ],
  },

  server: {
    preset: 'node-server',
    hooks: {
      'prerender:routes': async (routes) => {
        // fetch the pages you want to render
        const posts = await fetch('https://jsonplaceholder.typicode.com/posts');
        const postsData = await posts.json();

        // add each post path to the routes set
        postsData.forEach((post: any) => {
          routes.add(`/posts/${post.id}`);
        });
      },
    },
    prerender: {
      routes: ['/', '/posts'],
      crawlLinks: true,
    },
  },
});
