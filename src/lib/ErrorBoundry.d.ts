import React from 'react';
interface Props {
    children: React.ReactNode;
    fallback?: React.ReactNode;
}
declare const ErrorBoundary: React.FC<Props>;
export default ErrorBoundary;
