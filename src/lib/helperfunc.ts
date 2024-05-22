export const importPages = (directory: string) => {
    // Use import.meta.glob to import all files from the directory
    const pages = import.meta.glob(directory+'/**/*.{js,jsx,ts,tsx}')
    return pages;
}
