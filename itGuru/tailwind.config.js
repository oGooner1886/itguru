/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      // colors: {
      //   primary: "#5F4BFF",
      // },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        cairo: ["Cairo", "sans-serif"],
        openSans: ["Open Sans", "sans-serif"],
        robotoMono: ["Roboto Mono", "monospace"],
      },
      fontSize: {
        40: ["40px"],
        18: ["18px"],
      },
      keyframes: {
        progress: {
          "0%": { width: "0%", marginLeft: "0%" },
          "50%": { width: "40%", marginLeft: "30%" },
          "100%": { width: "0%", marginLeft: "100%" },
        },
      },
      animation: {
        "progress-loop": "progress 1.5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
