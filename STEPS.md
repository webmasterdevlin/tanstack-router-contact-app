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
- [x] place `TanStackRouterVite()` in the vite.config.ts' plugins
- [x] generate the `routeTree.gen.ts` using TanStack Router CLI
```zsh
npm i -g @tanstack/react-router-cli 
```
```zsh
tsr generate
```

