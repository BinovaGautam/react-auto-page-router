import React, { FunctionComponent, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes, useParams } from 'react-router-dom';
import {createRoutes , ErrorBoundary} from './lib';

const NotFound = () => (
  <div style={{ height: '100vh', width: '100%', display: 'flex',flexDirection:'column', justifyContent: 'center', alignItems: 'center', }} >
    <h1>404!</h1>
    <h2>Page Not Found</h2>
  </div>
)

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
  console.log('importedPages =====>>>>>>>', importedPages);
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
  
  //NotFound page is from the importedPages root level not-found page.
 
  // lazy(importedPages['/not-found'] as any) || (() => <div>Not Found</div>);

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
              <Route key={i} path={path}
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
    </Router>
  );
}

export default App;
