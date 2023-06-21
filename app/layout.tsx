import Nav from "@components/Nav";
import "@styles/globals.css";
import { Metadata } from 'next';
import Provider from "@components/Provider";
export const metadata: Metadata = {
    title: "Promptopia",
    description: "Discover and share ai prompts"
}
export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang='en'>
            <body>

                <div className='main'>
                    <div className="gradient" />
                </div>
                <main className="app">
                    <Nav />
                    {children}
                </main>
            </body>
        </html>
    )
}
