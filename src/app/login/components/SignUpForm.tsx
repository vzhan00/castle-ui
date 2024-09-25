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
            return;
        }

        const { error: SignUpError } = await supabase.auth.signUp({
            email,
            password,
        });
      
        if (SignUpError) {
            setShake(true);
        } else {
            setConfirmation('A confirmation email has been sent to you.');
        }
        setLoading(false);
    }

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
            <Input
                type="password"
                placeholder="Confirm Password"
                value={passwordConfirmation}
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