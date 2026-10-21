import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ToastProvider } from "@/components/ToastProvider";

export const metadata: Metadata = {
  title: { default: "Rota Limpa", template: "%s | Rota Limpa" },
  description: "Consulte rotas, horários e pontos de coleta de resíduos da sua região.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="antialiased">
        <ToastProvider>
          <div className="flex min-h-screen flex-col bg-slate-50 text-brand-texto">
            <Header />
            <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6 lg:py-12">{children}</main>
            <Footer />
          </div>
        </ToastProvider>
      </body>
    </html>
  );
}
