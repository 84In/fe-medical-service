import { Toaster } from "@/components/ui/toaster";
import type { Metadata } from "next";
// import {
//   IBM_Plex_Sans,
//   Inter,
//   Nunito_Sans,
//   Open_Sans,
//   Roboto,
//   Source_Sans_3,
// } from "next/font/google";
import "./globals.css";

// const inter = Inter({
//   subsets: ["latin", "vietnamese"],
//   variable: "--font-inter",
//   display: "swap",
// });

// // Font Roboto - Hỗ trợ tiếng Việt
// const roboto = Roboto({
//   weight: ["300", "400", "500", "700"],
//   subsets: ["latin"],
//   variable: "--font-roboto",
//   display: "swap",
// });

// // Font Open Sans - Hỗ trợ tiếng Việt
// const openSans = Open_Sans({
//   subsets: ["latin"],
//   variable: "--font-open-sans",
//   display: "swap",
// });

// // Font Nunito Sans - Rất tốt cho tiếng Việt
// const nunitoSans = Nunito_Sans({
//   subsets: ["latin"],
//   variable: "--font-nunito-sans",
//   display: "swap",
// });

// // Font Source Sans 3 - Hỗ trợ tiếng Việt
// const sourceSans3 = Source_Sans_3({
//   subsets: ["latin"],
//   variable: "--font-source-sans-3",
//   display: "swap",
// });

// // Font IBM Plex Sans - Hỗ trợ tiếng Việt
// const ibmPlexSans = IBM_Plex_Sans({
//   weight: ["300", "400", "500", "600", "700"],
//   subsets: ["latin"],
//   variable: "--font-ibm-plex-sans",
//   display: "swap",
// });

export const metadata: Metadata = {
  title: "VitaCare Medical",
  description: "Chăm sóc tận tâm – Sống khỏe mỗi ngày",
  keywords:
    "medical, healthcare, admin, dashboard, hospital, clinic, patient management",
  authors: [{ name: "VASD IT Team" }],
};
//Viewport settings for responsive design
export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#2563eb" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="VitaCare Medical" />
      </head>
      <body
        className={`font-inter antialiased`}
        suppressHydrationWarning={true}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
