'use client';

import { SyntheticEvent, useState } from "react";
import { useRouter } from 'next/navigation';
import { supabase } from "../../supabase";
import { Container, ErrorMessage, Form, Input, LoginButton } from "./styled";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Image from "next/image";
import LoginIcon from '@mui/icons-material/Login';
import { IconButton } from "@mui/material";

export default function Login() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<number>(0);  

    const router = useRouter(); // For redirecting

    const handleTabChange = (_event: SyntheticEvent, newValue: number) => {
        setActiveTab(newValue);
        setError(null); // Clear error on tab change
    };

    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            setError(error.message);
        } else {
            // Redirect to the home page or handle success
            router.push('/home');
        }
    };

    return (
        <Container>
            <Form onSubmit={handleSignIn}>
                <Tabs value={activeTab} variant="fullWidth" onChange={handleTabChange} sx={{ marginTop: '-10px', width: '100%' }}>
                    <Tab label="Sign In" />
                    <Tab label="Sign Up" />
                </Tabs>
                {error && <ErrorMessage>{error}</ErrorMessage>}
                <Input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <Input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <LoginButton>
                    <IconButton
                        type="submit"
                        sx={{
                            margin: '0 auto'
                        }}
                    >
                        <LoginIcon />
                    </IconButton >
                </LoginButton>
            </Form>
        </Container>
    );
}