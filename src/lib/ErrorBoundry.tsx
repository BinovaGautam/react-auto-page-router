import React from 'react';
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';
import { AlertWrapper } from '../comps';

interface Props {
    children: React.ReactNode;
    fallback ?: React.ReactNode;
}

const ErrorFallback: React.FC<{ error: Error }> = ({ error }) => {
    return (
        <AlertWrapper>
            <div role="alert">
                <h2 style={{color : 'red'}} > ERROR: </h2>
                <pre>{error.message}</pre>
            </div>
        </AlertWrapper>
    );
}

const ErrorBoundary: React.FC<Props> = ({ children, fallback = ErrorFallback }) => {
    return (
        <ReactErrorBoundary FallbackComponent={ErrorFallback}>
            {children}
        </ReactErrorBoundary>
    );
};

export default ErrorBoundary;
