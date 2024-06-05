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

        "slide-in-elliptic-bottom-fwd": {
          "0%": {
            transform: "translateY(600px) rotateX(30deg) scale(0)",
            transformOrigin: "50% 100%",
            opacity: "0",
          },
          "100%": {
            transform: "translateY(0) rotateX(0) scale(1)",
            transformOrigin: "50% -1400px",
            opacity: "1",
          },
        },
      },
      animation: {
        "slide-in-left": "slide-in-left 0.3s ease-in-out forwards",
        "slide-in-elliptic-bottom-fwd":
          "slide-in-elliptic-bottom-fwd 1s ease-out forwards",
      },
    },
  },
  plugins: [],
};
