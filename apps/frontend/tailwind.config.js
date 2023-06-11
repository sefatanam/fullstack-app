const { createGlobPatternsForDependencies } = require('@nx/angular/tailwind');
const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(__dirname, 'src/**/!(*.stories|*.spec).{ts,html}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {
      colors: {
        // Customize your colors here
        'white':'#ECF0F1',
        'blue':'#3498DB',
        'primary': '#2C3E50',
        'accent': '#E74C3C',
        'error':'#e70e41',
      },
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
};
