import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { Suspense } from 'react';
import { Route, Routes, useParams, useSearchParams } from 'react-router-dom';
import { createRoutes, ErrorBoundary } from './lib';
const NotFound = () => (_jsxs("div", { style: { height: '100vh', width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }, children: [_jsx("h1", { children: "404!" }), _jsx("h2", { children: "Page Not Found" })] }));
function App({ SuspenseFallBack = _jsx("div", { children: "Loading..." }), importedPages = {} }) {
    const routes = createRoutes(importedPages);
    const renderWithLayouts = (Component, layouts) => {
        const WrapperComponent = () => {
            const params = useParams();
            const [searchParams] = useSearchParams();
            const elementWithParams = React.createElement(Component, { params, ...params, searchParams });
            return layouts.reduce((acc, Layout) => {
                return React.createElement(Layout, {}, acc);
            }, elementWithParams);
        };
        return _jsx(WrapperComponent, {});
    };
    return (_jsx(Suspense, { fallback: SuspenseFallBack, children: _jsxs(Routes, { children: [routes.map((route, i) => {
                    const { path, component: Component, layout: layouts } = route;
                    const element = layouts
                        ? renderWithLayouts(Component, layouts)
                        : React.createElement(Component);
                    return (_jsx(Route, { path: path, element: _jsx(ErrorBoundary, { children: element }) }, i));
                }), _jsx(Route, { path: "*", Component: NotFound })] }) }));
}
export default App;
