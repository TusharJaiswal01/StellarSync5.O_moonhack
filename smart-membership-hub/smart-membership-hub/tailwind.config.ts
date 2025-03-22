import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
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
        neon: {
          green: "#00ff8c",
          blue: "#00d4ff",
          pink: "#ff00ff",
          purple: "#9d00ff",
        },
        deepblue: {
          DEFAULT: "#0a1530",
          50: "#0c1a3d",
          100: "#0f204a",
          200: "#132657",
          300: "#162c64",
          400: "#1a3271",
          500: "#1d387e",
          600: "#213e8b",
          700: "#244498",
          800: "#274aa5",
          900: "#2a50b2",
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
      boxShadow: {
        neon: "0 0 5px rgba(0, 255, 140, 0.5), 0 0 20px rgba(0, 255, 140, 0.2)",
        "neon-blue": "0 0 5px rgba(0, 212, 255, 0.5), 0 0 20px rgba(0, 212, 255, 0.2)",
        "neon-pink": "0 0 5px rgba(255, 0, 255, 0.5), 0 0 20px rgba(255, 0, 255, 0.2)",
        "blue-glow": "0 0 15px rgba(0, 100, 255, 0.5), 0 0 30px rgba(0, 50, 255, 0.3)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config

