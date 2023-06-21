import "@styles/globals.css";
import { Metadata } from 'next';

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
                    {children}
                </main>
            </body>
        </html>
    )
}
