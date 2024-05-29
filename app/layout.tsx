import "@Inklua/components-library/dist/styles/index.css";
import "@Inklua/components-library/dist/styles/icons/style.scss";
import "app/_styles/globals.scss";
import { Toaster } from "react-hot-toast";
import { ClientSideScripts } from "app/_components/Elements/ClientSideProps";
import { Footer, Header } from "app/_components/Layout";

// TODO: Usar app provider em contexto fechado, não global
// import { AppProvider } from "app/_providers";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ClientSideScripts />
      <html lang="pt-BR">
        <body>
          <Header />
          <main>
            {children}
          </main>
          <Footer />
          <Toaster />
        </body>
      </html>
    </>
  )
}