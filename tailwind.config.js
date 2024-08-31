
module.exports = {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors:{
          accent: "#DFE8E9",
        }
      },
    },
    plugins: [require('daisyui')],
    daisyui: {
      themes: [
        // {
        //   mytheme: {
        //     "primary": "#000000",
        //     "primary-foreground": "#FFFFFF",
        //     "secondary": "#2E3944",
        //     "accent": "#124E66",
        //     "neutral": "#748D92",
        //     "base-100": "#FFFFFF",
        //     "info": "#3abff8",
        //     "success": "#36d399",
        //     "warning": "#fbbd23",
        //     "error": "#f87272",
        //   },
        // },
        {
          "homepage": {
            "primary": "#000000",
            "primary-content": "#FFFFFF",
          }
        },
        "business", // you can add other themes here
        "light",
      ],
    },
  }
