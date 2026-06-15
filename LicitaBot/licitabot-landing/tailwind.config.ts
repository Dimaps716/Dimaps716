import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: "#111827",       // Gris oscuro premium para textos principales
          blue: "#2563EB",       // Azul eléctrico para acentos de botones
          whatsapp: "#16A34A",   // Verde oficial de WhatsApp para conversiones
          lightBg: "#F9FAFB",    // Fondo gris ultra-claro para secciones alternas
        },
      },
    },
  },
  plugins: [],
};
export default config;
