import React, { FunctionComponent, Suspense } from 'react';
import { BrowserRouter, Route, Routes, useParams, useSearchParams } from 'react-router-dom';
import { createRoutes, ErrorBoundary } from './lib';

const NotFound = () => (
  <div style={{ height: '100vh', width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
    <h1>404!</h1>
    <h2>Page Not Found</h2>
  </div>
);

export interface IAppConfig {
  /** Fallback component to show while loading pages */
  SuspenseFallBack?: React.ReactNode;
  /** Object from import.meta.glob containing page components */
  importedPages: Record<string, any>;
  /** 
   * If true (default), wraps routes in BrowserRouter. 
   * Set to false if you want to provide your own router wrapper.
   */
  withRouter?: boolean;
}

interface ComponentProps {
  params: Record<string, string | undefined>;
  searchParams: URLSearchParams;
}

/**
 * Inner component that renders the routes (must be inside a Router context)
 */
function AutoRoutes({
  SuspenseFallBack = <div>Loading...</div>,
  importedPages = {}
}: Omit<IAppConfig, 'withRouter'>) {
  const routes = createRoutes(importedPages);

  const renderWithLayouts = (Component: FunctionComponent<ComponentProps>, layouts: FunctionComponent[]) => {
    const WrapperComponent: FunctionComponent = () => {
      const params = useParams();
      const [searchParams] = useSearchParams();
      const elementWithParams = React.createElement(Component, { params, ...params, searchParams });

      return layouts.reduce((acc: React.ReactElement, Layout: FunctionComponent) => {
        return React.createElement(Layout, {}, acc);
      }, elementWithParams);
    };

    return <WrapperComponent />;
  };

  return (
    <Suspense fallback={SuspenseFallBack}>
      <Routes>
        {routes.map((route, i) => {
          const { path, component: Component, layout: layouts } = route;

          const element = layouts
            ? renderWithLayouts(Component, layouts)
            : React.createElement(Component);

          return (
            <Route
              key={i}
              path={path}
              element={
                <ErrorBoundary>
                  {element}
                </ErrorBoundary>
              }
            />
          );
        })}

        {/* This route catches all unmatched routes */}
        <Route path="*" Component={NotFound} />
      </Routes>
    </Suspense>
  );
}

/**
 * AutoRouter - Automatic file-based routing for React applications
 * 
 * @param props.importedPages - Object from import.meta.glob
 * @param props.SuspenseFallBack - Loading fallback (default: "Loading...")
 * @param props.withRouter - Wrap with BrowserRouter (default: true for backward compat)
 */
function App({
  SuspenseFallBack = <div>Loading...</div>,
  importedPages = {},
  withRouter = true
}: IAppConfig) {
  const routeContent = (
    <AutoRoutes 
      SuspenseFallBack={SuspenseFallBack} 
      importedPages={importedPages} 
    />
  );

  // If withRouter is true (default), wrap with BrowserRouter for backward compatibility
  if (withRouter) {
    return <BrowserRouter>{routeContent}</BrowserRouter>;
  }

  // Otherwise, return just the routes (user must provide their own Router)
  return routeContent;
}

export default App;

// Also export AutoRoutes for users who want just the routes without router
export { AutoRoutes };
