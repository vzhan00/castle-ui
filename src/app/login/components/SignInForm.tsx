import { FormControl, IconButton } from "@mui/material";
import { Input } from "../styled";
import CastleIcon from '@mui/icons-material/Castle';
import { useState } from "react";
import styled, { css, keyframes } from "styled-components";
import { useRouter } from "next/navigation";
import { supabase } from "../../../supabase";
import AutorenewIcon from '@mui/icons-material/Autorenew';

export const InputContainer = styled.div`
  display: flex;
`

export const shakeAnimation = keyframes`
  0% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  50% { transform: translateX(5px); }
  75% { transform: translateX(-5px); }
  100% { transform: translateX(0); }
`;

export const loadAnimation = keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
`;

export const ShakeIconButton = styled(IconButton)<{ shake: string, loading: string }>`
    ${({ shake }) =>
        (shake === 'true') &&
        css`
        animation: ${shakeAnimation} 0.3s ease-in-out;
    `}
    ${({ loading }) =>
        (loading === 'true') &&
        css`
            animation: ${loadAnimation} .7s linear infinite;
    `}
`;

export const LoginButtonContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`

export default function SignInForm() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [shake, setShake] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const router = useRouter(); // For redirecting

    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });


        const { data: { session } } = await supabase.auth.getSession();

        if (error) {
            setLoading(false);
            setShake(true);
            setTimeout(() => setShake(false), 300);
        } else {
            // Redirect to the home page or handle success
            router.push('/home');
        }
        setLoading(false);
    };

    return (
        <FormControl>
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
            <LoginButtonContainer>
                {loading ?
                    <ShakeIconButton
                        shake={shake.toString()}
                        loading={loading.toString()}
                    >
                        <AutorenewIcon />
                    </ShakeIconButton>
                    :
                    <ShakeIconButton
                        shake={shake.toString()}
                        loading={loading.toString()}
                        type="submit"
                        onClick={handleSignIn}
                    >
                        <CastleIcon />
                    </ShakeIconButton> 
                }
            </LoginButtonContainer>
        </FormControl>
    ) 
}