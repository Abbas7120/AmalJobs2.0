<<<<<<< HEAD
/** @type {import('tailwindcss').Config} */
=======
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'
>>>>>>> Improvement
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
<<<<<<< HEAD
  plugins: [],
=======
  plugins: [
    tailwindcss,
    autoprefixer,
  ],
>>>>>>> Improvement
};
