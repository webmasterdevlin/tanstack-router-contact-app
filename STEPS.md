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
```ts
- [x] install TanStack Router CLI
```bash
npm i -g @tanstack/router-cli
```
- [x] run the TanStack Router CLI to generate `routeTree.gen.ts` file
```bash
tsr generate
```
- [x] finish the `App.tsx` file
- [x] 