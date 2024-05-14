
# React Auto Page Router

**React Auto Page Router** is a lightweight library that provides Next.js-like automatic page routing for React applications. With this library, you can achieve seamless and dynamic routing with minimal configuration, leveraging Vite's import.meta.glob. This tool is perfect for developers looking for simplicity and efficiency in setting up their React application's routing.

## Installation

Install the package via npm or yarn:

```
npm install react-auto-page-router
```

or

```
yarn add react-auto-page-router
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

```
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
    

### Error Handling

The package includes an ErrorBoundary component that can be used to wrap your components for better error handling.

**Example of** ErrorBoundary:

```
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

## API

### AutoRouter

The AutoRouter component is the core of the library, automatically configuring routes based on your file structure.

#### Props

-   importedPages: An object returned by import.meta.glob containing the dynamic imports for your page components.
    

### ErrorBoundary

The ErrorBoundary component catches JavaScript errors in its child component tree and displays a fallback UI.

#### Props

-   fallback: A React node to display when an error is caught.
    

### withErrorBoundary

A higher-order component (HOC) that wraps a component with an ErrorBoundary.

#### Usage

```
import React, { lazy } from 'react';
import { withErrorBoundary } from 'react-auto-page-router';

const SomeComponent = lazy(() => import('./SomeComponent'));

const WrappedComponent = withErrorBoundary(SomeComponent, <div>Failed to load component</div>);

export default WrappedComponent;
```

## Vite-Specific Features

The import.meta.glob feature is specific to Vite. This library is optimized for use with Vite, which makes setting up dynamic routes extremely simple. If you're using another build tool or bundler, you might need to adapt the code or manually provide a similar glob functionality.

## Simplified Autorouting

With react-auto-page-router, you can achieve Next.js-like routing in your React applications with minimal setup. Just organize your files, use the AutoRouter component, and enjoy automatic, dynamic routing without the hassle.

## License

This project is licensed under the MIT License.