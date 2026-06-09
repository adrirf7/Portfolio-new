import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Permite imágenes locales y remotas. Añade dominios si usas imágenes externas.
    remotePatterns: [],
    // Muestra imagen en blanco si no se encuentra el archivo
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
  },
};

export default nextConfig;
