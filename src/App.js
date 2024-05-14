import { jsx as _jsx } from "react/jsx-runtime";
import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { createRoutes, ErrorBoundary } from './lib';
function App({ SuspenseFallBack = _jsx("div", { children: "Loading..." }), importedPages = {} }) {
    const routes = createRoutes(importedPages);
    console.log('ROUTES GOES ON HERE ======>>>>>>', routes);
    const renderWithLayouts = (Component, layouts) => {
        return layouts.reduce((acc, Layout) => {
            return React.createElement(Layout, {}, acc);
        }, React.createElement(Component));
    };
    return (_jsx(Router, { children: _jsx(Suspense, { fallback: SuspenseFallBack, children: _jsx(Routes, { children: routes.map((route, i) => {
                    const { path, component: Component, layout: layouts } = route;
                    const element = layouts
                        ? renderWithLayouts(Component, layouts)
                        : React.createElement(Component);
                    return (_jsx(Route, { path: path, element: _jsx(ErrorBoundary, { fallback: _jsx("div", { children: "Failed to load the route..." }), children: element }) }, i));
                }) }) }) }));
}
export default App;
