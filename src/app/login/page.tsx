'use client';

import { SyntheticEvent, useEffect, useState } from "react";
import { Container, SignInContainer } from "./styled";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import SignInForm from "./components/SignInForm";
import SignUpForm from "./components/SignUpForm";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { IconButton } from "@mui/material";
import { useRouter } from "next/navigation";
import { supabase } from "../../supabase";

export default function Login() {
    const [activeTab, setActiveTab] = useState<string>('sign-in');
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const router = useRouter();
    
    useEffect(() => {
        const checkSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();

            if (session) {
                router.push('/home');
            } else {
                setIsLoading(false);
            }
        };

        checkSession();
    }, [router]);

    const handleTabChange = (_event: SyntheticEvent, newValue: string) => {
        setActiveTab(newValue);
    };

    const handleBackClick = () => {
        router.push('/');
    }

    if (isLoading) {
        return;
    }

    return (
        <Container>
            <IconButton onClick={handleBackClick} style={{ 
                    position: 'absolute',
                    color: '#222222',
                    top: 50,
                    left: 50,
                }}>
                <ArrowBackIcon style={{
                    fontSize: 30,
                }}/>
            </IconButton>
            
            <SignInContainer>
                <Tabs 
                    value={activeTab} 
                    variant="fullWidth" 
                    onChange={handleTabChange}
                    TabIndicatorProps={{
                        sx: {
                          backgroundColor: '#222222', // Color of the underline indicator
                        },
                    }}
                    sx={{ 
                        fontWeight: 'bold',
                        marginTop: '-10px',
                        marginBottom: '20px',
                        width: '100%',
                        borderRadius: '8px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        '& .MuiTab-root': {
                            color: '#222222',
                            '&.Mui-selected': {
                                color: '#222222',          // Gray color for selected tab
                            },
                        },
                    }}
                >
                    <Tab label="Sign In" value={'sign-in'} disableRipple />
                    <Tab label="Sign Up" value={'sign-up'} disableRipple />
                </Tabs>
                {(activeTab === 'sign-in') && <SignInForm />}
                {(activeTab === 'sign-up') && <SignUpForm />}
            </SignInContainer>
        </Container>
    );
}