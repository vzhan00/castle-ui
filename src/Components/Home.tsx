import { Container } from "@mui/material";
import Button from "@mui/material/Button";
import React from "react";
import { supabase } from "..";
import { useGetWatchlistByIdQuery, useLazyGetWatchlistByIdQuery } from "../services/WatchlistApi";

export function Home() {
    const { data } = useGetWatchlistByIdQuery('1')

    const onClickWatchlist = () => {
        console.log(data)
    }

    const signOut = () => {
        console.log(5555)
        supabase.auth.signOut();
    }

    return (
        <Container>
            <Button onClick={onClickWatchlist} variant="contained">Get Watchlist</Button>
            <Button onClick={signOut} variant="contained">Log out</Button>
        </Container>
    )
}