import {type Config} from "tailwindcss";
import {fontFamily} from "tailwindcss/defaultTheme";
import {nextui} from "@nextui-org/react";

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
        },
    },
    darkMode: "class",
    plugins: [
        nextui(
            {
                themes: {
                    dark: {
                        colors: {
                            foreground: "#F5E8DA",
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
                            foreground: "#000000",
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
