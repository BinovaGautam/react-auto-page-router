import React from 'react';
export interface IAppConfig {
    SuspenseFallBack?: React.ReactNode;
    importedPages: Record<string, any>;
}
declare function App({ SuspenseFallBack, importedPages }: IAppConfig): import("react/jsx-runtime").JSX.Element;
export default App;
