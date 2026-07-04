import "../globals.css";

export const metadata = {
  title: "Aurelice & Rogerio | Bodas de Prata",
  description: "Landing page de casamento para confirmação de presença e lista de presentes."
  ,
  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.svg"
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        {children}
        <div id="modal-root" />
      </body>
    </html>
  );
}