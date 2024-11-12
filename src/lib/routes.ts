import { ComponentType, LazyExoticComponent, lazy } from 'react';

export interface IBaseRoute {
    path: string;
    component: LazyExoticComponent<ComponentType<any>>;
    layout?: LazyExoticComponent<ComponentType<any>>[];
}

const routeConfig = {
    allowedEndFile: ["page", "layout"]
}

// Use a glob import to get all page components
// const importPages = import.meta.glob('/src/app/**/*.{js,jsx,ts,tsx}');

const createRoutes = (importPages: Record<string, any>) => {
    
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
    const layouts: Record<string, LazyExoticComponent<ComponentType<any>>[]> = {};
    
    // Generate a route object for each page component
    const routes: IBaseRoute[] = sortedPaths.map((path, counter) => {
       
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
    
       
        // Check if the file is a page component or a layout component
        const isPage = routeConfig.allowedEndFile.some((endFile) => currentEnd === endFile);
        if (!isPage) return false;
    
        // Lazy load the page component
        const component = lazy(importPages[path] as any);
        // React.createElement(component, {},ErrorBoundary)
    
        // Check if the file is a layout component
        if (currentEnd === 'layout') {
            layouts[basePath] = layouts[basePath] || [];
            layouts[basePath].push(component);
             return false;
        }
    
        // Determine the layouts for this route
        const layoutPaths = Object.keys(layouts).filter(layout => basePath.startsWith(layout));
    
        // Include __ROOT__ layout if available
        if (layouts['__ROOT__'] && !layoutPaths.includes('__ROOT__')) {
            layoutPaths.push('__ROOT__');
        }
    
        
        const layout: LazyExoticComponent<ComponentType<any>>[] = layoutPaths.reduce((acc, layoutPath) => {
            acc.push(...layouts[layoutPath]);
            return acc;
        }, [] as LazyExoticComponent<ComponentType<any>>[]);
    
        return { path: basePath === '__ROOT__' ? '/' : basePath, component, layout };
    }).filter(item => item !== false) as IBaseRoute[];

    return routes;
}

export { createRoutes };

