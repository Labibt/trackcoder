import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from 'tailwindcss';  // Import Tailwind CSS here
import autoprefixer from 'autoprefixer'; // Import Autoprefixer here

export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [
        tailwindcss,  // Use the imported Tailwind CSS
        autoprefixer, // Use the imported Autoprefixer
      ],
    },
  },
});
