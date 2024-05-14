import React from 'react';
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';

interface Props {
    children: React.ReactNode;
    fallback ?: React.ReactNode;
}

const ErrorFallback: React.FC<{ error: Error }> = ({ error }) => (
    <div role="alert">
        <p>Something went wrong:</p>
        <pre>{error.message}</pre>
    </div>
);

const ErrorBoundary: React.FC<Props> = ({ children, fallback = ErrorFallback }) => {
    return (
        <ReactErrorBoundary FallbackComponent={() => <>{fallback}</>}>
            {children}
        </ReactErrorBoundary>
    );
};

export default ErrorBoundary;
