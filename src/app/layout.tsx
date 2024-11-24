import Head from "next/head";
import Image from 'next/legacy/image';
import StyledComponentsRegistry from "../lib/registry"
import { Providers } from "./providers"
import './globals.css';

export const metadata = {
  title: 'Castle',
  description: 'For those who watch movies',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const backgroundImages = [
		'/swiss_station.webp',
	]
  
  return (
    <html lang="en">
      <Providers>
        <body>
          <Head>
            <link key={1} rel='preload' href={'/swiss_station.webp'} as='image' />
          </Head>
          <div className='backgroundImage'>
            <Image
              src={'/swiss_station.webp'}
              priority={true}
              layout="fill"
              objectPosition='center'
              objectFit="cover"
            />
          </div>
          <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
        </body>
      </Providers>
    </html>
  )
}
