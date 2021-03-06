// eslint-disable-next-line no-undef
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        'auto-flow-grid': 'repeat(auto-fill, minmax(10rem, 1fr))'
      }
    },
  },
  plugins: [],
};
