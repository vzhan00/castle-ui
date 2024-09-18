import { Providers } from "./providers"

export const metadata = {
  title: 'Next.js',
  description: 'Generated by Next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const style = {
    height: '100vh',
		backgroundImage: `url(swiss_sign.jpg)`,
    backgroundSize: 'cover',
		backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
	};

  return (
    <html lang="en">
      <Providers>
        <body>{children}</body>
      </Providers>
    </html>
  )
}
