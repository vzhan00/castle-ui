'use server';

import SignIn from "../components/SignIn";
import Image from 'next/legacy/image';
import Head from 'next/head';
import './landing.css';

export default async function Landing() {
	return (
		<div className='contentContainer'>
			<h1>Castle</h1>
			<div>Quick, easy, and clean way to keep track of your movies and get recommendations</div>
			<SignIn />
		</div>
	);
}
