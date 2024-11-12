import React, { Suspense, ReactElement } from 'react';
import { createRoutes } from './routes';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';

interface AutoRouterProps {
  importedPages: Record<string, () => Promise<any>>;
  SuspenseFallBack?: React.ReactNode;
  errorElement?: ReactElement;
  onError?: (error: Error, info: React.ErrorInfo) => void;
  errorFallbackRender?: (props: FallbackProps) => ReactElement;
  withRouter?: boolean;
  basename?: string;
}

const DefaultErrorFallback = ({ error, resetErrorBoundary }: FallbackProps): ReactElement => {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
};

export const AutoRouter: React.FC<AutoRouterProps> = ({ 
  importedPages,
  SuspenseFallBack = <div>Loading...</div>,
  errorElement,
  onError = (error) => console.error('Error in AutoRouter:', error),
  errorFallbackRender = DefaultErrorFallback,
  withRouter = false,
  basename
}) => {
  if (!importedPages || Object.keys(importedPages).length === 0) {
    console.warn('No pages provided to AutoRouter');
    return null;
  }

  const routes = createRoutes(importedPages);

  const RoutesComponent = (
    <ErrorBoundary
      FallbackComponent={errorFallbackRender}
      onError={onError}
      onReset={() => {
        window.location.href = basename || '/';
      }}
    >
      <Suspense fallback={SuspenseFallBack}>
        <Routes>
          {routes.map((route, index) => {
            const Component = route.component;
            let element = (
              <ErrorBoundary
                FallbackComponent={() => 
                  errorElement as ReactElement || 
                  <DefaultErrorFallback 
                    error={new Error('Component failed to load')} 
                    resetErrorBoundary={() => {}}
                  />
                }
              >
                <Component />
              </ErrorBoundary>
            );

            if (route.layout) {
              route.layout.forEach((Layout) => {
                element = (
                  <ErrorBoundary
                    FallbackComponent={() => 
                      errorElement as ReactElement || 
                      <DefaultErrorFallback 
                        error={new Error('Layout failed to load')} 
                        resetErrorBoundary={() => {}}
                      />
                    }
                  >
                    <Layout>{element}</Layout>
                  </ErrorBoundary>
                );
              });
            }

            return (
              <Route
                key={`route-${index}-${route.path}`}
                path={route.path}
                element={element}
              />
            );
          })}
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );

  return withRouter ? (
    <BrowserRouter basename={basename}>{RoutesComponent}</BrowserRouter>
  ) : (
    RoutesComponent
  );
}; 