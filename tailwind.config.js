import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ['class'],
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.{vue,js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Barlow Condensed', ...defaultTheme.fontFamily.sans],
                display: ['Knewave', 'cursive'],
                script: ['Knewave', 'cursive'],
            },
            borderRadius: {
                lg: 'var(--radius)',
                md: 'var(--radius)',
                sm: 'var(--radius)',
            },
            colors: {
                background: 'hsl(var(--background))',
                foreground: 'hsl(var(--foreground))',
                card: {
                    DEFAULT: 'hsl(var(--card))',
                    foreground: 'hsl(var(--card-foreground))',
                },
                popover: {
                    DEFAULT: 'hsl(var(--popover))',
                    foreground: 'hsl(var(--popover-foreground))',
                },
                primary: {
                    DEFAULT: 'hsl(var(--primary))',
                    foreground: 'hsl(var(--primary-foreground))',
                },
                secondary: {
                    DEFAULT: 'hsl(var(--secondary))',
                    foreground: 'hsl(var(--secondary-foreground))',
                },
                muted: {
                    DEFAULT: 'hsl(var(--muted))',
                    foreground: 'hsl(var(--muted-foreground))',
                },
                accent: {
                    DEFAULT: 'hsl(var(--accent))',
                    foreground: 'hsl(var(--accent-foreground))',
                },
                destructive: {
                    DEFAULT: 'hsl(var(--destructive))',
                    foreground: 'hsl(var(--destructive-foreground))',
                },
                border: 'hsl(var(--border))',
                input: 'hsl(var(--input))',
                ring: 'hsl(var(--ring))',
                chart: {
                    1: 'hsl(var(--chart-1))',
                    2: 'hsl(var(--chart-2))',
                    3: 'hsl(var(--chart-3))',
                    4: 'hsl(var(--chart-4))',
                    5: 'hsl(var(--chart-5))',
                },
                sidebar: {
                    DEFAULT: 'hsl(var(--sidebar-background))',
                    foreground: 'hsl(var(--sidebar-foreground))',
                    primary: 'hsl(var(--sidebar-primary))',
                    'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
                    accent: 'hsl(var(--sidebar-accent))',
                    'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
                    border: 'hsl(var(--sidebar-border))',
                    ring: 'hsl(var(--sidebar-ring))',
                },
                brand: {
                    ink: '#050708',
                    cream: '#FFFFFF',
                    gold: '#2CCBF2',
                    'gold-hover': '#FFFFFF',
                    muted: '#B8C4C9',
                    'muted-2': '#8A969B',
                    'muted-3': '#D6DDE0',
                    line: '#16333A',
                    line2: '#1A3A42',
                    line3: '#2CCBF2',
                    card: '#0B0F11',
                    card2: '#0B0F11',
                    strip: '#070A0C',
                    corpo: '#2CCBF2',
                    mente: '#7EE0A3',
                    fe: '#7EB6FF',
                    familia: '#B8C4C9',
                    conhecimento: '#2CCBF2',
                    bronze: '#8A969B',
                    silver: '#D6DDE0',
                },
            },
        },
    },
    plugins: [require('tailwindcss-animate')],
};
