import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/styles';
import { createVuetify } from 'vuetify';

export default createVuetify({
    theme: {
        defaultTheme: 'dark',
        themes: {
            light: {
                colors: {
                    background: '#FFFCF8', // Light Cream
                    primary: '#FFB53B', // Yellow
                    secondary: '#8BCFF9', // Light Sky Blue
                },
            },
            dark: {
                colors: {
                    background: '#0F0F0F', // Smokie Black
                    surface: '#121212', // Dark Gray
                    primary: '#2B2343', // Dark Purple
                    secondary: '#5CBBF6', // Light Sky Blue
                },
            },
        },
    },
});
