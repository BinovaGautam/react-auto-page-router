type ImportGlobFunction = Record<string, () => Promise<any>>;

export const importPages = (directory: string = '/src/app'): ImportGlobFunction => {
    // Create a mapping of common directory patterns
    const patterns = {
        '/src/app': import.meta.glob('/src/app/**/*.{js,jsx,ts,tsx}'),
        '/app': import.meta.glob('/app/**/*.{js,jsx,ts,tsx}'),
        '/pages': import.meta.glob('/pages/**/*.{js,jsx,ts,tsx}'),
        './src/app': import.meta.glob('./src/app/**/*.{js,jsx,ts,tsx}'),
        './app': import.meta.glob('./app/**/*.{js,jsx,ts,tsx}'),
        './pages': import.meta.glob('./pages/**/*.{js,jsx,ts,tsx}')
    };

    try {
        // Validate directory input
        if (!directory || typeof directory !== 'string') {
            console.warn('Invalid directory provided, falling back to /src/app');
            return patterns['/src/app'];
        }

        // Normalize the directory path
        const normalizedDir = directory.startsWith('./') ? directory : 
                            directory.startsWith('/') ? directory : 
                            './' + directory;

        // Return the matching pattern or default to /src/app if not found
        return patterns[normalizedDir as keyof typeof patterns] || patterns['/src/app'];
    } catch (error) {
        console.error('Error in importPages:', error);
        return patterns['/src/app'];
    }
};
