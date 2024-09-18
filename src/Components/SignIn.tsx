'use client';

import React, { useEffect, useState } from "react";
import { Auth } from "@supabase/auth-ui-react";
import {
    // Import predefined theme
    ThemeSupa,
} from "@supabase/auth-ui-shared";
import { Session } from "@supabase/supabase-js";
import { Home } from "./Home";import { supabase } from "../supabase";


export default function SignIn() {
    const [session, setSession] = useState<Session | null>(null)

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
        });

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
        });

        return () => subscription.unsubscribe()
    }, [])

    if (!session) {
        return (
            <div>
                <Auth
                    supabaseClient={supabase}
                    appearance={{ theme: ThemeSupa }}
                    providers={[]}
                />
            </div>
        );
    }
    else {
        console.log(session)
        return (
            <Home />
        )
    }
}
