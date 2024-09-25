'use server';

import Home from './home/page';
import { supabase } from '../supabase';
import { SignInButton } from './SignInButton';

export default async function Landing() {
	const { data, error } = await supabase.auth.getSession();
	const session = data.session;

	if (session) {
		return <Home />;
	}

	return (
		<div className='contentContainer notSelectable'>
			<h1>Castle</h1>
			<div>Quick, easy, and clean way to keep track of your movies and get recommendations</div>
			<SignInButton />
		</div>
	);
}
