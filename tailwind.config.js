
module.exports = {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {},
    },
    plugins: [require('daisyui')],
    daisyui: {
      themes: [
        // {
        //   mytheme: {
        //     "primary": "#212A31",
        //     "secondary": "#2E3944",
        //     "accent": "#124E66",
        //     "neutral": "#748D92",
        //     "base-100": "#212A31",
        //     "info": "#3abff8",
        //     "success": "#36d399",
        //     "warning": "#fbbd23",
        //     "error": "#f87272",
        //   },
        // },
        "business", // you can add other themes here
      ],
    },
  }