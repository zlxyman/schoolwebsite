tailwind.config = {
    theme: {
        extend: {
            fontFamily: {
                sans: ['"Plus Jakarta Sans"', 'sans-serif'],
            },
            colors: {
                game: {
                    dark: '#0a0f1d',
                    panel: '#151b2d',
                    primary: '#3b82f6',
                    accent: '#f59e0b',
                    success: '#10b981',
                    danger: '#ef4444'
                }
            },
            animation: {
                'float': 'float 3s ease-in-out infinite',
                'pulse-glow': 'pulseGlow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-15px)' },
                },
                pulseGlow: {
                    '0%, 100%': { boxShadow: '0 0 20px 0px rgba(59, 130, 246, 0.3)' },
                    '50%': { boxShadow: '0 0 40px 10px rgba(59, 130, 246, 0.6)' },
                }
            }
        }
    }
}
