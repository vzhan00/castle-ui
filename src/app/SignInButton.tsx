'use client';

import Button from "@mui/material/Button";
import { useRouter } from 'next/navigation';

export function SignInButton() {
    const router = useRouter();

    const handleClick = () => {
		router.push('/login');
	};

    return (
        <Button
            variant="contained"
            sx={{
                borderRadius: '50px', // Rounded edges
                backgroundColor: 'black',
                opacity: '0.7',
                backdropFilter: 'blur(5px)', // Optional: adds blur for a frosted effect
                color: '#fff', // Text color
                padding: '10px 20px', // Padding for a larger button
                marginTop: '20px',
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)', // Slight shadow
                '&:hover': {
                backgroundColor: 'black',
                opacity: '0.8' // Slightly less transparent on hover
                },
            }}
            onClick={handleClick}
        >
            Step In
        </Button>
    );
}