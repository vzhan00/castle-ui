import { Movie } from "./Movie";

export interface WatchlistResponse {
    watchlist: Watchlist;
}

export interface WatchlistProps {
    watchlist: Watchlist;
}

export interface Watchlist {
    watchlistId: number;
    watchlistName: string;
    watchlistItems: WatchlistItem[];
}

export interface WatchlistItem {
    watchlistItemId: number;
    movie: Movie;
}