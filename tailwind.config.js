module.exports = {
  mode: 'jit',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./App.tsx",
    "./index.ts"
  ],
  theme: {
    extend: {
      colors: {
        'primary': {
          100: '##FFD7C7',
          200: '#FF916F',
          300: '#FF9270'
        },
      }
    },
  },
  plugins: [],
  corePlugins: require('tailwind-rn/unsupported-core-plugins'),
}
