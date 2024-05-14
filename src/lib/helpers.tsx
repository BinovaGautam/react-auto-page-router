import React, { ComponentType, ReactNode, LazyExoticComponent } from 'react';
import ErrorBoundary from './ErrorBoundry';

export function withErrorBoundary(
    Component: LazyExoticComponent<ComponentType<any>>,
    fallback: ReactNode
): React.FC {
    return function WrappedComponent() {
        return (
            <ErrorBoundary fallback= { fallback } >
                <Component />
            </ErrorBoundary>
    );
    };
}