import '@/styles/globals.scss'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    
    return (
        <>
            <html 
                lang="en" 
                suppressHydrationWarning
                className={inter.className}
            >
                <head />
                <body>
                    {children}
                </body>
            </html>
        </>
    )
}