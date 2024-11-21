"use client";

import React, { useEffect, useState } from "react";

import { Container } from "@mui/material";
import { supabase } from "../../supabase";
import { useRouter } from "next/navigation";
import ListContainer from "../../components/ListContainer";
import {
    useCreateDefaultWatchlistsMutation,
    useGetAllWatchlistsQuery,
} from "../../services/WatchlistApi";
import SearchBar from "../../components/search/SearchBar";
import Modal from "@mui/material/Modal";
import { Watchlist } from "../../types/Watchlist";
import { WatchlistsContext } from "../contexts/WatchlistsContext";
import { Movie } from "../../types/Movie";
import { Grid2 } from "@mui/material";
import HomeAppBar from "../../components/HomeAppBar";
import { v4 as uuidv4 } from "uuid";

export default function Home() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [createDefaultWatchlists, { isLoading: isCreating, isSuccess }] =
        useCreateDefaultWatchlistsMutation();
    const [watchlists, setWatchlists] = useState<Watchlist[] | undefined>(
        undefined
    );
    const [addedMovie, setAddedMovie] = useState<Movie | undefined>(undefined);
    const [watchedListId, setWatchedListId] = useState<string | undefined>(
        undefined
    );

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

    useEffect(() => {
        console.log(watchlists);
        setWatchedListId(
            watchlists?.find((wl) => wl.isWatchedList)?.watchlistId
        );
        console.log(watchedListId);
    }, [watchlists]);

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
        const wlid = uuidv4();
        const wedid = uuidv4();
        const createDefaultsIfNewUser = async () => {
            if (!watchlistsLoading && !isCreating && watchlists?.length == 0) {
                await createDefaultWatchlists({watchlistId: wlid, watchedListId: wedid});
            }
        };
        createDefaultsIfNewUser();
        const newWl = {watchlistId: wlid, watchlistName: "Watchlist", isWatchedList: false, watchlistItems: []}
        const newWed = {watchlistId: wedid, watchlistName: "Watched", isWatchedList: true, watchlistItems: []}
        if (watchlists?.length === 0 && !watchlistsLoading) {
            setWatchlists([newWl, newWed]);
        }
    }, [watchlists]);

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
        return null;
    }

    return (
        <Container maxWidth={false} style={{ padding: 0 }}>
            <HomeAppBar />
            <WatchlistsContext.Provider
                value={{
                    watchlists,
                    setWatchlists,
                    addedMovie,
                    setAddedMovie,
                    watchedListId,
                }}
            >
                <Container maxWidth={false} style={{ paddingTop: "5%" }}>
                    <Grid2 container>
                        {watchlists?.map((watchlist) => (
                            !watchlist.isWatchedList &&
                            <Grid2
                                size={6}
                                style={{
                                    display: "flex",
                                    justifyContent: "center", // Horizontally center
                                }}
                            >
                                <ListContainer
                                    watchlist={watchlist}
                                    openModalWithWatchlist={
                                        openModalWithWatchlist
                                    }
                                />
                            </Grid2>
                        ))}
                        {watchlists?.map((watchlist) => (
                            watchlist.isWatchedList &&
                            <Grid2
                                size={6}
                                style={{
                                    display: "flex",
                                    justifyContent: "center", // Horizontally center
                                }}
                            >
                                <ListContainer
                                    watchlist={watchlist}
                                    openModalWithWatchlist={
                                        openModalWithWatchlist
                                    }
                                />
                            </Grid2>
                        ))}
                    </Grid2>
                </Container>
                <Modal
                    sx={{
                        backgroundColor: "rgba(0, 0, 0, 0.3)",
                        backdropFilter: "blur(5px)",
                        display: "flex",
                        justifyContent: "center", // Horizontally center
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
