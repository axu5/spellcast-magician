import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Spellcast Magician",
    description:
        "Figure out the best move in spellcast for any position instantly!",
    icons: {
        icon: "/spellcast-magician.ico",
    },
    keywords: [
        "spellcast",
        "discord",
        "activity",
        "solver",
        "hack",
        "cheat",
        "magician",
    ],
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang='en'>
            <head>
                <link
                    rel='icon'
                    href='/spellcast-magician.ico'
                    sizes='any'
                />

                {/* Google */}
                <meta
                    name='google-site-verification'
                    content='X9LGH52btFxhOm64YQUNVdXVxJmmRj1h6KPftxq8e0o'
                />
            </head>
            <body className={inter.className}>{children}</body>
        </html>
    );
}
