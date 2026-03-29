import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FlowTrack",
  description: "Painel de produtividade pessoal com tarefas, hábitos e pomodoro.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
