"use client";

import React, { useEffect, useState } from "react";

import { Container } from "@mui/material";
import Button from "@mui/material/Button";
import { supabase } from "../../supabase";
import { useRouter } from "next/navigation";
import { ListContainer } from "../../components/ListContainer";
import {
    useCreateDefaultWatchlistsMutation,
    useGetAllWatchlistsQuery,
} from "../../services/WatchlistApi";
import { SearchBar } from "../../components/search/SearchBar";
import Modal from "@mui/material/Modal";
import { Watchlist } from "../../types/Watchlist";
import { WatchlistsContext } from "../contexts/WatchlistsContext";
import { Movie } from "../../types/Movie";

export default function Home() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [createDefaultWatchlists, { isLoading: isCreating, isSuccess }] =
        useCreateDefaultWatchlistsMutation();
    const [watchlists, setWatchlists] = useState<Watchlist[] | undefined>(
        undefined
    );
    const [addedMovie, setAddedMovie] = useState<Movie | undefined>(undefined);

    const {
        data: watchlistsResponse,
        isLoading: watchlistsLoading,
        refetch,
    } = useGetAllWatchlistsQuery();
    const watchlistsInit: Watchlist[] | undefined =
        watchlistsResponse?.allWatchlists;

    useEffect(() => {
        if (watchlistsInit) {
            setWatchlists(watchlistsInit);
        }
    }, [watchlistsLoading]);

    const [open, setOpen] = React.useState(false);
    const [modalWatchlist, setModalWatchlist] = useState<Watchlist | null>(
        null
    );
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const openModalWithWatchlist = (watchlist: Watchlist) => {
        setModalWatchlist(watchlist); // Set the passed data
        handleOpen(); // Open the modal
    };

    useEffect(() => {
        const checkSession = async () => {
            const {
                data: { session },
            } = await supabase.auth.getSession();

            if (!session) {
                router.push("/");
            } else {
                setIsLoading(false);
            }
        };

        checkSession();
    }, [router]);

    useEffect(() => {
        const createDefaultsIfNewUser = async () => {
            if (!watchlistsLoading && !isCreating && watchlists?.length === 0) {
                await createDefaultWatchlists();
            }
        };

        createDefaultsIfNewUser();
    }, [watchlistsLoading]);

    useEffect(() => {
        if (isSuccess) {
            refetch();
        }
    }, [isSuccess]);

    const signOut = () => {
        supabase.auth.signOut();
        router.push("/login");
    };

    if (isLoading || isCreating) {
        return;
    }

    return (
        <Container>
            <Button onClick={signOut} variant="contained">
                Log out
            </Button>
            <WatchlistsContext.Provider
                value={{ watchlists, setWatchlists, addedMovie, setAddedMovie }}
            >
                {watchlists?.map((watchlist) => (
                    <ListContainer
                        watchlist={watchlist}
                        openModalWithWatchlist={openModalWithWatchlist}
                    />
                ))}
                <Modal
                    sx={{
                        backgroundColor: "rgba(0, 0, 0, 0.3)",
                        backdropFilter: "blur(5px)",
                    }}
                    open={open}
                    onClose={handleClose}
                >
                    <SearchBar
                        watchlist={modalWatchlist!}
                        closeModal={handleClose}
                    />
                </Modal>
            </WatchlistsContext.Provider>
        </Container>
    );
}
