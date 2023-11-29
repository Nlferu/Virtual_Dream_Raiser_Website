import type { Config } from "tailwindcss"

const config: Config = {
    content: ["./pages/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}", "./app/**/*.{js,ts,jsx,tsx,mdx}"],
    theme: {
        extend: {
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
            transitionTimingFunction: {
                customBezier: "cubic-bezier(0.4,2.1,0.7,1)",
            },
            transitionDuration: {
                custom: "0.3s",
            },
            boxShadow: {
                dark: "0 4px 10px 1px rgb(42 14 97 / 0.5)",
                blur: "0 0 40px 0 rgb(4,0,22)",
                night: "0px 0px 9px rgba(0, 0, 0, 0.8)",
                nightA: "0px 0px 15px rgba(0, 0, 0, 1)",
            },
            colors: {
                lightPurple: "#2A0E61",
                darkPurple: "#7042f861",
                devil: "rgba(12, 9, 9, 0.35)",
            },
        },
    },
    plugins: [],
}
export default config
