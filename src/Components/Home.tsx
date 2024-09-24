'use client';

import React from "react";

import { Container } from "@mui/material";
import Button from "@mui/material/Button";
import { WatchlistView } from "./Watchlist";
import { useLazyGetWatchlistByIdQuery } from "../services/WatchlistApi";
import { supabase } from "../supabase";
import { ListContainer } from "./ListContainer";

export function Home() {
    const [getWatchlistById, watchlistQueryResponse] = useLazyGetWatchlistByIdQuery();

    const onClickWatchlist = () => {
        getWatchlistById('1');
    }

    const signOut = () => {
        console.log(5555)
        supabase.auth.signOut();
    }

    const watchlist = watchlistQueryResponse.data?.watchlist

    console.log(watchlist)

    return (
        <Container>
            <Button onClick={onClickWatchlist} variant="contained">Get Watchlist</Button>
            <Button onClick={signOut} variant="contained">Log out</Button>
            {watchlistQueryResponse.data && <WatchlistView watchlist={watchlistQueryResponse.data.watchlist} /> &&
            <ListContainer watchlist={watchlistQueryResponse.data.watchlist}></ListContainer>}
        </Container>
    );
}