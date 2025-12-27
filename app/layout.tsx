import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Danser la Vie',
  description: 'Site des stages et cours de danse',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body>
        {children}
      </body>
    </html>
  )
}