import React, { FunctionComponent, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes, useParams } from 'react-router-dom';
import {createRoutes , ErrorBoundary} from './lib';

export interface IAppConfig {
  SuspenseFallBack?: React.ReactNode;
  importedPages : Record<string, any>;
}

interface ComponentProps {
  params: any; // Replace 'any' with the actual type of 'params'
  searchParams: URLSearchParams;
}


function App({
  SuspenseFallBack = <div>Loading...</div>,
  importedPages = {}

}: IAppConfig) {
  const routes = createRoutes(importedPages);

  const renderWithLayouts = (Component: FunctionComponent<ComponentProps>, layouts: FunctionComponent[]) => {
    const WrapperComponent: FunctionComponent = () => {
      const params = useParams();
      const searchParams = new URLSearchParams(window.location.search);
      const elementWithParams = React.createElement(Component, { params, ...params, searchParams});

      return layouts.reduce((acc: React.ReactElement, Layout: FunctionComponent) => {
        return React.createElement(Layout, {}, acc);
      }, elementWithParams);
    };

    return <WrapperComponent />;
  };

  return (
    <Router>
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
                  <ErrorBoundary fallback={<div>Failed to load the route...</div>}>
                    {element}
                  </ErrorBoundary>
                }
              />
            );
          })}
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
