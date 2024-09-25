'use client';

import React, { useEffect, useState } from "react";

import { Container } from "@mui/material";
import Button from "@mui/material/Button";
import { supabase } from "../../supabase";
import { useRouter } from "next/navigation";
import { ListContainer } from "../../components/ListContainer";
import { useGetAllWatchlistsQuery } from "../../services/WatchlistApi";

export default function Home() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const checkSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();

            if (!session) {
                router.push('/');
            } else {
                setIsLoading(false);
            }
        };

        checkSession();
    }, [router]);

    const watchlistsResponse = useGetAllWatchlistsQuery().data;
    const watchlists = watchlistsResponse?.allWatchlists

    const signOut = () => {
        supabase.auth.signOut();
        router.push('/login');
    }

    if (isLoading) {
        return;
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