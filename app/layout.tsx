import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "EcoTrack",
  description:
    "EcoTrack est une application qui extrait des fichiers JSON générés par Lighthouse pour présenter des données de performance web sous forme de graphiques évolutifs. L'application calcule également un éco-score basé sur les résultats de Lighthouse et valide l'adhérence aux bonnes pratiques définies dans un référentiel spécifique de France Travail.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  )
}
