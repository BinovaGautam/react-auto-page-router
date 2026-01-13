
# React Auto Page Router

**React Auto Page Router** is a lightweight library that provides Next.js-like automatic page routing for React applications. With this library, you can achieve seamless and dynamic routing with minimal configuration, leveraging Vite's import.meta.glob. This tool is perfect for developers looking for simplicity and efficiency in setting up their React application's routing.

## Installation

Install the package via npm or yarn:

```bash
npm install react-auto-page-router react-router-dom
```

or

```bash
yarn add react-auto-page-router react-router-dom
```

## Usage

To use the react-auto-page-router in your project, follow these steps:

### 1. Set Up Your File Structure

Organize your pages and layouts in the src/app directory. For example:

```
src/
  app/
    Home.page.tsx
    About.page.tsx
    Layout.layout.tsx
    blog/
      [id].page.tsx
```

### 2. Import and Use the AutoRouter Component

In your App.tsx file, use the import.meta.glob to dynamically import the page components and pass them to the AutoRouter component.

**src/App.tsx**:

```tsx
import React from 'react';
import { AutoRouter } from 'react-auto-page-router';

const importPages = import.meta.glob('/src/app/**/*.{js,jsx,ts,tsx}');

const App = () => {
  return (
    <>
      <AutoRouter importedPages={importPages} />
    </>
  );
}

export default App;
```

### 3. Configure Routes Automatically

The AutoRouter component sets up the routes based on your file structure. It supports nested routes and dynamic routes using the [param] syntax.

**Example Directory Structure**:

```
src/
  app/
    Home.page.tsx
    About.page.tsx
    Layout.layout.tsx
    blog/
      [id].page.tsx
```

**Routes Generated**:

-   / -> Home.page.tsx
-   /about -> About.page.tsx
-   /blog/:id -> [id].page.tsx

## API

### AutoRouter

The AutoRouter component is the core of the library, automatically configuring routes based on your file structure.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `importedPages` | `Record<string, any>` | *required* | Object returned by `import.meta.glob` containing page components |
| `SuspenseFallBack` | `React.ReactNode` | `<div>Loading...</div>` | Fallback component shown while pages are loading |
| `withRouter` | `boolean` | `true` | Whether to wrap with BrowserRouter. Set to `false` if providing your own router |

### Using Your Own Router (Advanced)

If you need to use a different router type (HashRouter, MemoryRouter) or configure router options, set `withRouter={false}`:

```tsx
import { HashRouter } from 'react-router-dom';
import { AutoRouter } from 'react-auto-page-router';

const importPages = import.meta.glob('/src/app/**/*.{js,jsx,ts,tsx}');

const App = () => {
  return (
    <HashRouter>
      <AutoRouter importedPages={importPages} withRouter={false} />
    </HashRouter>
  );
}

export default App;
```

### Page Component Props

Your page components receive `params` and `searchParams` as props:

```tsx
// src/app/blog/[id].page.tsx
interface PageProps {
  params: { id: string };
  searchParams: URLSearchParams;
}

export default function BlogPost({ params, searchParams }: PageProps) {
  return (
    <div>
      <h1>Blog Post: {params.id}</h1>
      <p>Query: {searchParams.get('query')}</p>
    </div>
  );
}
```

### Error Handling

The package includes an ErrorBoundary component that can be used to wrap your components for better error handling.

```tsx
import React from 'react';
import { ErrorBoundary } from 'react-auto-page-router';

const FallbackComponent = ({ error }: { error: Error }) => (
  <div>
    <p>Something went wrong:</p>
    <pre>{error.message}</pre>
  </div>
);

const MyComponent = () => {
  return (
    <ErrorBoundary fallback={<FallbackComponent />}>
      <SomeOtherComponent />
    </ErrorBoundary>
  );
};

export default MyComponent;
```

### withErrorBoundary

A higher-order component (HOC) that wraps a component with an ErrorBoundary.

```tsx
import React, { lazy } from 'react';
import { withErrorBoundary } from 'react-auto-page-router';

const SomeComponent = lazy(() => import('./SomeComponent'));

const WrappedComponent = withErrorBoundary(SomeComponent, <div>Failed to load component</div>);

export default WrappedComponent;
```

## Vite-Specific Features

The import.meta.glob feature is specific to Vite. This library is optimized for use with Vite, which makes setting up dynamic routes extremely simple. If you're using another build tool or bundler, you might need to adapt the code or manually provide a similar glob functionality.

## License

This project is licensed under the MIT License.