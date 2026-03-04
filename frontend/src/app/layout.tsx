import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from '@/components/Navbar';
import Footer from '@/components/layout/Footer';
import NotificationManager from '@/components/notifications/NotificationManager';

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "Escola PAZ e BEM",
  description: "Plataforma de cursos online da Escola PAZ e BEM",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${montserrat.variable} font-sans antialiased`}
      >
        <Navbar />
        <main>
          {children}
        </main>
        <Footer />
        <NotificationManager />
      </body>
    </html>
  );
}