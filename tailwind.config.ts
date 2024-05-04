import type { Config } from "tailwindcss"

const {nextui} = require("@nextui-org/react");

const config = {
  darkMode: "class",
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
	],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    nextui({
      themes: {
        dark: {
          colors: {
            background: {
              DEFAULT: "#24273a",
              foreground: "#181c35"
            },
            content1: "#e3e5f2",
            content2: "#d1d5ea",
            content3: "#c0c4e3",
            content4: "#a7add7",
            danger: {
              "50": "#fcf8f8",
              "100": "#f9f0f2",
              "200": "#f2dee1",
              "300": "#ebccd1",
              "400": "#e5bdc3",
              "500": "#d699a2",
              "600": "#cb7c88",
              "700": "#ab4454",
              "800": "#752f39",
              "900": "#37161b",
              DEFAULT: "#ED8796"
            },
            default: {
              50: "#f9f9fb",
              100: "#f3f3f7",
              200: "#e3e5ed",
              300: "#d3d6e3",
              400: "#c7cadb",
              500: "#a8adc7",
              600: "#8f96b7",
              700: "#5d6692",
              800: "#404664",
              900: "#1e212f",
              DEFAULT: "#e3e5ed",
              foreground: "#1e212f"
            },
            divider: "#808ac6",
            focus: "#8CAFF5",
            foreground: {
              50: "#f9f9fb",
              100: "#f3f4f7",
              200: "#e4e6ec",
              300: "#d5d8e2",
              400: "#c9ccd9",
              500: "#abb0c4",
              600: "#939ab4",
              700: "#626c8d",
              800: "#434960",
              900: "#1f222d",
              DEFAULT: "#C9D2F5",
              foreground: "#f9f9fb"
            },
            overlay: "#24273B",
            primary: {
              50: "#f8f9fc",
              100: "#f0f3f9",
              200: "#dee5f2",
              300: "#ccd6eb",
              400: "#bdcbe5",
              500: "#99add6",
              600: "#7c96cb",
              700: "#4467ab",
              800: "#2f4675",
              900: "#162137",
              DEFAULT: "#8CAFF5"
            },
            secondary: {
              50: "#faf8fc",
              100: "#f4f1f8",
              200: "#e7e0f0",
              300: "#dacfe8",
              400: "#cfc1e1",
              500: "#b59fd1",
              600: "#a083c3",
              700: "#744ea2",
              800: "#4f356e",
              900: "#251934",
              DEFAULT: "#C69FF5"
            },
            success: {
              50: "#f9fcf8",
              100: "#f3f8f2",
              200: "#e4efe1",
              300: "#d6e7d0",
              400: "#cae0c2",
              500: "#accea1",
              600: "#95c186",
              700: "#659e51",
              800: "#456c37",
              900: "#20321a",
              DEFAULT: "#A5D993"
            },
            warning: {
              50: "#fcfaf8",
              100: "#f8f6f1",
              200: "#f0ebe0",
              300: "#e7dfd0",
              400: "#e0d6c2",
              500: "#cfbfa0",
              600: "#c1ad85",
              700: "#9f8550",
              800: "#6d5b37",
              900: "#332a1a",
              DEFAULT: "#EDD39F"
            }
          },
          extend: "dark"
        }
      }
    }
    ),
  ],
} satisfies Config

export default config