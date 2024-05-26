import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';
import { AlertWrapper } from '../comps';
const ErrorFallback = ({ error }) => {
    return (_jsx(AlertWrapper, { children: _jsxs("div", { role: "alert", children: [_jsx("h2", { style: { color: 'red' }, children: " ERROR: " }), _jsx("pre", { children: error.message })] }) }));
};
const ErrorBoundary = ({ children, fallback = ErrorFallback }) => {
    return (_jsx(ReactErrorBoundary, { FallbackComponent: ErrorFallback, children: children }));
};
export default ErrorBoundary;
