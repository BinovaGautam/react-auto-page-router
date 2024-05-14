import React, { FunctionComponent, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {routes , ErrorBoundary} from './lib';
import { IAppConfig } from './types';

function App({
  SuspenseFallBack = <div>Loading...</div>
}: IAppConfig) {

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
