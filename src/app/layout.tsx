import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Container, SSRProvider } from "@/components/bootstrap";
import { NavBar } from "./NavBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Image Library",
  description: "this peroject show different caching method",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NavBar />
        <SSRProvider>
          <main>
            <Container className="py-4">{children}</Container>
          </main>
        </SSRProvider>
      </body>
    </html>
  );
}
