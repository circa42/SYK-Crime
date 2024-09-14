/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './templates/**/*.twig',
    './src/**/*.js',
  ],
      theme: {
        extend: {
          fontFamily: {
            sans: ['Inter', 'sans-serif'],
          },
          keyframes: {
            slideDown: {
              '0%': { transform: 'translateY(-100%)', opacity: '0' },
              '100%': { transform: 'translateY(0)', opacity: '1' },
            },
            slideUp: {
              '0%': { transform: 'translateY(0)', opacity: '1' },
              '100%': { transform: 'translateY(-100%)', opacity: '0' },
            },
          },
          animation: {
            slideDown: 'slideDown 0.5s ease-out forwards',
            slideUp: 'slideUp 0.5s ease-out forwards',
          },
        },
      },
      plugins: [],
};

