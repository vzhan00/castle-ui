import React from "react";

import { Container } from "@mui/material";
import Button from "@mui/material/Button";
import { WatchlistView } from "./Watchlist";
import { useLazyGetWatchlistByIdQuery } from "../services/WatchlistApi";
import { supabase } from "../supabase";

export function Home() {
    const [trigger, { data }] = useLazyGetWatchlistByIdQuery();

    const onClickWatchlist = () => {
        trigger('1');
    }

    const signOut = () => {
        console.log(5555)
        supabase.auth.signOut();
    }

    console.log(data)

    return (
        <Container>
            <Button onClick={onClickWatchlist} variant="contained">Get Watchlist</Button>
            <Button onClick={signOut} variant="contained">Log out</Button>
            {data && <WatchlistView watchlist={data.watchlist} />}
        </Container>
    )
}