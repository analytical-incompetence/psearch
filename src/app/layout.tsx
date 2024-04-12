import "@/styles/globals.css";

import { TRPCReactProvider } from "@/trpc/react";
import { Inter } from "next/font/google";
import { Providers } from "./providers";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-sans",
});

export const metadata = {
    title: "pSearch",
    description: "The web browser you never knew you needed",
    icons: [{rel: "icon", url: "/favicon2.png"}],
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className="dark">
        <body className={`font-sans ${inter.variable}`}>
        <Providers>
            <TRPCReactProvider>{children}</TRPCReactProvider>
        </Providers>
        </body>
        </html>
    );
}
