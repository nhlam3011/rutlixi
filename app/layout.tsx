import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Rút Lì Xì Năm Mới 2026',
    description: 'Chúc Mừng Năm Mới 2026 - Rút Lì Xì May Mắn!',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="vi">
            <body className={inter.className}>{children}</body>
        </html>
    )
}
