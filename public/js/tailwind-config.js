tailwind.config = {
    theme: {
        extend: {
            fontFamily: { sans: ['"Plus Jakarta Sans"', 'sans-serif'] },
            colors: {
                brand: {
                    primary: '#1d4486', // Navy
                    yellow: '#ffcb05',  // Secondary Yellow
                    red: '#d2232a',     // Secondary Red
                    light: '#ffffff',
                    gray: '#f9fafb',    // Clean light gray for backgrounds
                    blue: '#eaf1fb',
                    dark: '#0f2447'
                }
            },
            borderRadius: {
                '4xl': '2rem',
                '5xl': '2.5rem',
                '6xl': '3rem',
            },
            boxShadow: {
                'soft': '0 20px 40px -15px rgba(29,68,134,0.05)',
                'glow-primary': '0 0 30px rgba(29,68,134,0.2)',
                'glow-yellow': '0 0 30px rgba(255,203,5,0.3)',
                'glow-red': '0 0 25px rgba(210,35,42,0.4)',
                'floating': '0 20px 50px -10px rgba(0,0,0,0.1)',
            }
        }
    }
}
