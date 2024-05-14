import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';
const ErrorFallback = ({ error }) => (_jsxs("div", { role: "alert", children: [_jsx("p", { children: "Something went wrong:" }), _jsx("pre", { children: error.message })] }));
const ErrorBoundary = ({ children, fallback = ErrorFallback }) => {
    return (_jsx(ReactErrorBoundary, { FallbackComponent: () => _jsx(_Fragment, { children: fallback }), children: children }));
};
export default ErrorBoundary;
