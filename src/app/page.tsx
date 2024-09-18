import SignIn from "../components/SignIn";
import Image from 'next/legacy/image';
import './landing.css';

export default function Landing() {
	const backgroundImages = [
		'/swiss_mountains.jpg',
		'/swiss_sign.jpg',
		'/swiss_station.jpg',
		'/swiss_wall.jpg',
	]
	const index = Math.floor(Math.random() * backgroundImages.length);
	const currentBackgroundImage = backgroundImages[index]
	
	return (
		<div>
			<div className='backgroundImage'><div />
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
		</div>
	);
}
