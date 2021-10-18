module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: "#082032",
        primary_light: "#334756",
      },
      fontFamily: {
        pop: "Poppins, sans-serif",
      },
      minHeight: {
        "1/2": "50%",
      },
      height: {
        screen: "90vh",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
