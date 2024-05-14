import { jsx as _jsx } from "react/jsx-runtime";
import ErrorBoundary from './ErrorBoundry';
export function withErrorBoundary(Component, fallback) {
    return function WrappedComponent() {
        return (_jsx(ErrorBoundary, { fallback: fallback, children: _jsx(Component, {}) }));
    };
}
