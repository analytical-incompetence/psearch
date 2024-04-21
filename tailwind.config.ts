import {nextui} from "@nextui-org/react";
import {type Config} from "tailwindcss";
import {fontFamily} from "tailwindcss/defaultTheme";

// import { default as flattenColorPalette } from "tailwindcss/lib/util/flattenColorPalette";
// import { colors } from "tailwindcss/colors";

const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");
const {
    default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

export default {
    content: ["./src/**/*.{tsx, ts, jsx, js}",
        "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                sans: ["var(--font-sans)", ...fontFamily.sans],
            },
            animation: {
                first: "moveVertical 30s ease infinite",
                second: "moveInCircle 20s reverse infinite",
                third: "moveInCircle 40s linear infinite",
                fourth: "moveHorizontal 40s ease infinite",
                fifth: "moveInCircle 20s ease infinite",
            },
            keyframes: {
                moveHorizontal: {
                    "0%": {
                        transform: "translateX(-50%) translateY(-10%)",
                    },
                    "50%": {
                        transform: "translateX(50%) translateY(10%)",
                    },
                    "100%": {
                        transform: "translateX(-50%) translateY(-10%)",
                    },
                },
                moveInCircle: {
                    "0%": {
                        transform: "rotate(0deg)",
                    },
                    "50%": {
                        transform: "rotate(180deg)",
                    },
                    "100%": {
                        transform: "rotate(360deg)",
                    },
                },
                moveVertical: {
                    "0%": {
                        transform: "translateY(-50%)",
                    },
                    "50%": {
                        transform: "translateY(50%)",
                    },
                    "100%": {
                        transform: "translateY(-50%)",
                    },
                },
            },
        },
    },
    darkMode: "class",
    plugins: [
        nextui(
            {
                themes: {
                    dark: {
                        colors: {
                            foreground: "#a1dcf7",
                            primary: {
                                DEFAULT: "#0F0140",
                                foreground: "#00FF00",
                            },
                            secondary: {
                                DEFAULT: "#CDEFFF",
                                foreground: "#000000"
                            },
                            background: "#262526",
                        },
                    },
                    light: {
                        colors: {
                            foreground: "#223B61",
                            // foreground: "#FF0000",
                            primary: {
                                DEFAULT: "#0F0140",
                                foreground: "#00FF00",
                            },
                            secondary: {
                                DEFAULT: "#223B61",
                                foreground: "#F5E8DA"
                            },
                            background: "#F5E8DA",
                        },
                    },
                },
            }
        ),
        addVariablesForColors
    ],
} satisfies Config;

function addVariablesForColors({addBase, theme}: any) {
    const allColors = flattenColorPalette(theme("colors"));
    const newVars = Object.fromEntries(
        Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
    );

    addBase({
        ":root": newVars,
    });
}
