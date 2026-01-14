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
}

interface ComponentProps {
  params: Record<string, string | undefined>;
  searchParams: URLSearchParams;
}

/**
 * AutoRouter - Automatic file-based routing for React applications
 * 
 * @param props.importedPages - Object from import.meta.glob
 * @param props.SuspenseFallBack - Loading fallback (default: "Loading...")
 */
function App({
  SuspenseFallBack = <div>Loading...</div>,
  importedPages = {}
}: IAppConfig) {
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
    <BrowserRouter>
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
    </BrowserRouter>
  );
}

export default App;
