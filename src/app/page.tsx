import SignIn from "../components/SignIn";
import Image from 'next/legacy/image';
import Head from 'next/head';
import './landing.css';

export default function Landing() {
	const backgroundImages = [
		'/swiss_mountains.webp',
		'/swiss_sign.webp',
		'/swiss_station.webp',
		'/swiss_wall.webp',
	]
	const index = Math.floor(Math.random() * backgroundImages.length);
	const currentBackgroundImage = backgroundImages[index]
	
	return (
		<>
			<Head>
				{backgroundImages.map((src, idx) => {
					<link key={idx} rel='preload' href={src} as='image' />
				})}
			</Head>
			<div className='background' />
			<div className='backgroundImage'>
				<Image
					src={currentBackgroundImage}
					priority={true}
					layout="fill"
					objectPosition='center'
					objectFit="cover"
					alt="Background"
				/>
			</div>
			<div className='content-container'>
				<h1>{index}</h1>
				<h1>Castle</h1>
				<div>Quick, easy, and clean way to keep track of your movies and get recommendations</div>
				<SignIn />
			</div>
		</>
	);
}
