/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      spacing: {},
      colors: {
        primary: '#B6004C',
        secondary: '#0066CD',
        hover: '#631028',
        grayPrimary: '#3D3D3D',
      },
    },
  },
  plugins: [],
};
