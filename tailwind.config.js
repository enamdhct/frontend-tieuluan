/** @type {import('tailwindcss').Config} */
import { nextui } from "@nextui-org/react";
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/flowbite/**/*.js",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      screens: {
        sm: { max: "639px" },
        // => @media (max-width: 639px) { ... }

        md: { max: "767px" },
        // => @media (max-width: 767px) { ... }

        lg: { max: "1023px" },
        // => @media (max-width: 1023px) { ... }

        xl: { max: "1279px" },
        // => @media (max-width: 1279px) { ... }

        "2xl": { max: "1535px" },
        // => @media (max-width: 1535px) { ... }
      },
    },
    
  },
  darkMode: "class",
  plugins: [require("flowbite/plugin"), nextui()],
}
