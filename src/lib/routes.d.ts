import { ComponentType, LazyExoticComponent } from 'react';
interface IBaseRoute {
    path: string;
    component: LazyExoticComponent<ComponentType<any>>;
    layout?: LazyExoticComponent<ComponentType<any>>[];
}
declare const createRoutes: (importPages: Record<string, any>) => IBaseRoute[];
export { createRoutes };
