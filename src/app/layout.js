import "../globals.css";

export const metadata = {
  title: "Aurelice & Rogerio | Bodas de Prata",
  description: "Landing page de casamento para confirmação de presença e lista de presentes."
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
