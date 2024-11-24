import { useState } from "react";
import { ConfirmationMessage, Input } from "../styled";
import { FormControl } from "@mui/material";
import CastleIcon from '@mui/icons-material/Castle';
import { ShakeIconButton } from "./SignInForm";
import styled from "styled-components";
import AutorenewIcon from '@mui/icons-material/Autorenew';
import { supabase } from "../../../supabase";

export const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`

export default function SignUpForm() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [passwordConfirmation, setPasswordConfirmation] = useState<string>('');
    const [shake, setShake] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [confirmation, setConfirmation] = useState<string | null>(null);

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        if (password !== passwordConfirmation) {
            setShake(true);
            setLoading(false);
            setTimeout(() => setShake(false), 300);
            return;
        }

        const { error: SignUpError } = await supabase.auth.signUp({
            email,
            password,
        });
      
        if (SignUpError) {
            setShake(true);
            setTimeout(() => setShake(false), 300);
        } else {
            setConfirmation('A confirmation email has been sent to you.');
        }
        setLoading(false);
    }

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === "Enter") {
            event.preventDefault(); // Prevent the default form submission
            handleSignUp(event);
        }
    };

    return (
        <FormControl>
            <Input
                type="email"
                placeholder="Email"
                value={email}
                onKeyDown={handleKeyDown}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <Input
                type="password"
                placeholder="Password"
                value={password}
                onKeyDown={handleKeyDown}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <Input
                type="password"
                placeholder="Confirm Password"
                value={passwordConfirmation}
                onKeyDown={handleKeyDown}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                required
            />
            <Container>
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
                        onClick={handleSignUp}
                    >
                        <CastleIcon />
                    </ShakeIconButton> 
                }
            </Container>
            {confirmation && 
            <Container><ConfirmationMessage>{confirmation}</ConfirmationMessage></Container>}
        </FormControl>
    )
}