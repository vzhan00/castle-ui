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

export interface WatchlistItemProps {
    watchlistItem: WatchlistItem;
    watchlistId: number;
}

export interface AllWatchlistsResponse {
    allWatchlists: Watchlist[]
}

export interface WatchlistItemTableEntry {
    watchlistItemId: number;
    watchlistId: number;
    movieId: number;
}