import Nav from "@components/Nav";
import "@styles/globals.css";
import { Metadata } from 'next';
import Provider from "@components/Provider";
export const metadata: Metadata = {
    title: "Promptopia",
    description: "Discover and share ai prompts"
}
export default function RootLayout({ children, session }: { children: React.ReactNode, session: any }) {

    return (
        <html lang='en'>
            <body>
                <Provider session={session}>
                    <div className='main'>
                        <div className="gradient" />
                    </div>
                    <main className="app">
                        <Nav />
                        {children}
                    </main>
                </Provider>
            </body>
        </html>
    )
}
