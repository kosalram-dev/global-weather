module.exports = {
  content: [
    './src/screens/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      height: {
        'calc-full-minus-56': 'calc(100% - 56px)',
      },
    },
  },
};
