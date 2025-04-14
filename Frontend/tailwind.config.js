/** @type {import('tailwindcss').Config} */
export default {
    darkMode:'class',
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // You can customize dark and light theme colors here
                darkBackground: '#1a202c', // Example dark background color
                lightBackground: '#f7fafc', // Example light background color
            },
        },
    },
    plugins: [],
};
