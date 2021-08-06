module.exports = {
    mode: 'jit',
    purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        screens: {
            sm: '640px',
            md: '768px',
            lg: '1024px',
            xl: '1280px',
            '2xl': '1536px'
        },
        fontFamily: {
            sans: [
                'Inter\\ UI',
                'SF\\ Pro\\ Display',
                '-apple-system',
                'BlinkMacSystemFont',
                'Segoe\\ UI',
                'Roboto',
                'Oxygen',
                'Ubuntu',
                'Cantarell',
                'Open\\ Sans',
                'Helvetica\\ Neue',
                'sans-serif'
            ]
        }
    },
    variants: {
        extend: {}
    },
    plugins: []
};
