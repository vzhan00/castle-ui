'use client';

import React from "react";

import { Container } from "@mui/material";
import Button from "@mui/material/Button";
import { useLazyGetWatchlistByIdQuery } from "../../services/WatchlistApi";
import { supabase } from "../../supabase";
import { WatchlistView } from "../../components/Watchlist";
import { useRouter } from "next/navigation";

export default function Home() {
    const router = useRouter();
    const [trigger, { data }] = useLazyGetWatchlistByIdQuery();

    const onClickWatchlist = () => {
        trigger('1');
    }

    const signOut = () => {
        supabase.auth.signOut();
        router.push('/login');
    }

    return (
        <Container>
            <Button onClick={onClickWatchlist} variant="contained">Get Watchlist</Button>
            <Button onClick={signOut} variant="contained">Log out</Button>
            {data && <WatchlistView watchlist={data.watchlist} />}
        </Container>
    )
}