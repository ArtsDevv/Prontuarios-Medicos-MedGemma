import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

// Apenas a Plus Jakarta (que funciona nativamente) fica aqui
const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["600"],
  variable: "--font-plus-jakarta",
});

export const metadata: Metadata = {
  title: "MedGemma",
  description: "Assistente Clínico IA",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        {/* Injetando as fontes stencil diretamente no navegador (À prova de falhas) */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Post+No+Bills+Colombo:wght@300&family=Post+No+Bills+Jaffna:wght@400&display=swap" rel="stylesheet" />
      </head>
      <body className={`${plusJakartaSans.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}