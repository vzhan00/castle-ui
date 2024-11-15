import React, { createContext, useState, useContext, ReactNode } from "react";
import { Watchlist } from "../../types/Watchlist";
import { Movie } from "../../types/Movie";

interface WatchlistContextType {
    watchlists: Watchlist[] | undefined;
    setWatchlists: React.Dispatch<
        React.SetStateAction<Watchlist[] | undefined>
    >;
    addedMovie: Movie | undefined;
    setAddedMovie: React.Dispatch<React.SetStateAction<Movie | undefined>>;
}

export const WatchlistsContext = createContext<
    WatchlistContextType | undefined
>(undefined);
