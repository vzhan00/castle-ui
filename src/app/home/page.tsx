'use client';

import React from "react";

import { Container } from "@mui/material";
import Button from "@mui/material/Button";
import { supabase } from "../../supabase";
import { useRouter } from "next/navigation";
import { ListContainer } from "../../components/ListContainer";
import { useGetAllWatchlistsQuery } from "../../services/WatchlistApi";

export default function Home() {
    const router = useRouter();

    const watchlistsResponse = useGetAllWatchlistsQuery().data;
    const watchlists = watchlistsResponse?.allWatchlists
    
    console.log(watchlists);

    const signOut = () => {
        console.log(5555)
        supabase.auth.signOut();
    }

    return (
        <Container>
            <Button onClick={signOut} variant="contained">Log out</Button>
            {watchlists?.map((watchlist) => (
                <ListContainer watchlist={watchlist}/>
            ))}
        </Container>
    );
}