import React, { FunctionComponent, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {createRoutes , ErrorBoundary} from './lib';

export interface IAppConfig {
  SuspenseFallBack?: React.ReactNode;
  importedPages : Record<string, any>;
}

function App({
  SuspenseFallBack = <div>Loading...</div>,
  importedPages = {}

}: IAppConfig) {
  const routes = createRoutes(importedPages);
  console.log('ROUTES GOES ON HERE ======>>>>>>',routes);

  const renderWithLayouts = (Component: FunctionComponent, layouts: FunctionComponent[]) => {
    return layouts.reduce((acc, Layout) => {
      return React.createElement(Layout, {}, acc);
    }, React.createElement(Component));
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
