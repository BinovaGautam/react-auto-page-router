import { lazy } from 'react';
const routeConfig = {
    allowedEndFile: ["page", "layout"]
};
// Use a glob import to get all page components
// const importPages = import.meta.glob('/src/app/**/*.{js,jsx,ts,tsx}');
const createRoutes = (importPages) => {
    // Sort the imported file paths by depth and alphabetical order
    const sortedPaths = Object.keys(importPages).sort((a, b) => {
        const depthA = a.split('/').length;
        const depthB = b.split('/').length;
        if (depthA !== depthB) {
            return depthA - depthB;
        }
        return a.localeCompare(b);
    });
    console.log('Sorted import pages: hello here we go', { sortedPaths });
    // Store layout components separately
    const layouts = {};
    // Generate a route object for each page component
    const routes = sortedPaths.map((path, counter) => {
        console.log('Processing path:', { path, counter, layouts });
        // Remove the '/src/app' and the file extension from the file path
        let routePath = path.replace('/src/app', '').replace(/\.(js|jsx|ts|tsx)$/, '');
        // Handle slug or id in the route denoted by []
        if (routePath.includes('[') && routePath.includes(']')) {
            const start = routePath.indexOf('[');
            const end = routePath.indexOf(']');
            const slug = routePath.slice(start + 1, end);
            routePath = routePath.replace(`[${slug}]`, `:${slug}`);
        }
        const currentEnd = routePath.split('/').pop();
        const basePath = routePath === '/' + currentEnd ? '__ROOT__' : routePath.replace('/' + currentEnd, '');
        console.log('Determined path components:', { currentEnd, routePath, basePath });
        // Check if the file is a page component or a layout component
        const isPage = routeConfig.allowedEndFile.some((endFile) => currentEnd === endFile);
        if (!isPage)
            return false;
        // Lazy load the page component
        const component = lazy(importPages[path]);
        // React.createElement(component, {},ErrorBoundary)
        // Check if the file is a layout component
        if (currentEnd === 'layout') {
            layouts[basePath] = layouts[basePath] || [];
            layouts[basePath].push(component);
            console.log('Added layout component:', { currentEnd, routePath, basePath, layouts });
            return false;
        }
        // Determine the layouts for this route
        const layoutPaths = Object.keys(layouts).filter(layout => basePath.startsWith(layout));
        // Include __ROOT__ layout if available
        if (layouts['__ROOT__'] && !layoutPaths.includes('__ROOT__')) {
            layoutPaths.push('__ROOT__');
        }
        console.log('Final route details:', { path, counter, layouts, layoutPaths });
        const layout = layoutPaths.reduce((acc, layoutPath) => {
            acc.push(...layouts[layoutPath]);
            return acc;
        }, []);
        return { path: basePath === '__ROOT__' ? '/' : basePath, component, layout };
    }).filter(item => item !== false);
    return routes;
};
export { createRoutes };
