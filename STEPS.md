# Steps in building the project from the starter repo
- [x] download the starter repo
- [x] npm install
- [x] create a folder named `routes` inside the `src` folder
- [x] create a file named `__root.tsx` inside the `routes` folder
```tsx
import { createRootRoute } from "@tanstack/react-router";

export const Route = createRootRoute({
    component: RootComponent
});

function RootComponent() {
    return (
        <div>
            <h1>Hello from React and TanStack Router</h1>
        </div>
    );
}
```
- [x] import and add `TanStackRouterVite()` in vite.config.ts's `plugins` array
- [x] install TanStack Router CLI
```bash
npm i -g @tanstack/router-cli
``` 
- [x] run the TanStack Router CLI to generate `routeTree.gen.ts` file
```bash
tsr generate
```
The tsr generate command will generate a `routeTree.gen.ts` file in the `src` folder. Normally in React Router, we would have to manually create the routes and nested routes. But with TanStack Router, we can generate the routes and nested routes using the CLI.
- [x] run the tsr watcher to watch for changes in the `routeTree.gen.ts` file
```bash
tsr watch
```
- [x] run the project
```bash
npm run dev
```
- [x] finish the `App.tsx` file
- [x] 