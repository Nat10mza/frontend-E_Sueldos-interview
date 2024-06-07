/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      keyframes: {
        "slide-in-left": {
          "0%": {
            transform: "translateX(-1000px)",
            opacity: "0",
          },
          "100%": {
            transform: "translateX(0)",
            opacity: "1",
          },
        },

        "slide-in-fwd-center": {
          "0%": {
            transform: "translateZ(-1400px)",
            opacity: "0",
          },
          "100%": {
            transform: "translateZ(0)",
            opacity: "1",
          },
        },
      },
      animation: {
        "slide-in-left":
          "slide-in-left 0.4s cubic-bezier(0.250, 0.460, 0.450, 0.940) both",
        "slide-in-fwd-center":
          "slide-in-fwd-center 0.6s cubic-bezier(0.250, 0.460, 0.450, 0.940) both",
      },
    },
  },
  plugins: [],
};
