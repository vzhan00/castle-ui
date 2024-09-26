'use client';

import React, { useEffect, useState } from "react";

import { Container } from "@mui/material";
import Button from "@mui/material/Button";
import { supabase } from "../../supabase";
import { useRouter } from "next/navigation";
import { ListContainer } from "../../components/ListContainer";
import { useCreateDefaultWatchlistsMutation, useGetAllWatchlistsQuery } from "../../services/WatchlistApi";

export default function Home() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [createDefaultWatchlists, { isLoading: isCreating, isSuccess }] = useCreateDefaultWatchlistsMutation();
    
    const { data: watchlistsResponse, isLoading: watchlistsLoading, refetch  } = useGetAllWatchlistsQuery();
    const watchlists = watchlistsResponse?.allWatchlists

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

    useEffect(() => {
        const createDefaultsIfNewUser = async () => {
            if (!watchlistsLoading && !isCreating && watchlists?.length === 0)  {
                await createDefaultWatchlists();
            }
        }

        createDefaultsIfNewUser();
    }, [watchlistsLoading])

    useEffect(() => {
        if (isSuccess) {
            refetch();
        }
    }, [isSuccess])

    console.log(watchlists)

    const signOut = () => {
        supabase.auth.signOut();
        router.push('/login');
    }

    if (isLoading || isCreating) {
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