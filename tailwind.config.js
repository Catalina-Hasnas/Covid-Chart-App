module.exports = {
  purge: [],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {
      colors: theme => ({
        "bg": '#282c34'
      }),
      fontFamily: {
        body: ['Open Sans', 'sans-serif']
      },
      boxShadow: {
        pink: 'inset 0px 0px 6px 1px rgba(236, 72, 153, 0.6)'
      },
      width: {
        '26': 106
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
