import { Movie } from "./Movie";

export interface WatchlistResponse {
    watchlist: Watchlist;
}

export interface WatchlistProps {
    watchlist: Watchlist;
}

export interface Watchlist {
    watchlistId: string;
    watchlistName: string;
    isWatchedList: boolean;
    watchlistItems: WatchlistItem[];
}

export interface WatchlistItem {
    watchlistItemId: string;
    movie: Movie;
}

export interface WatchlistItemProps {
    watchlistItem: WatchlistItem;
    watchlistId: string;
}

export interface AllWatchlistsResponse {
    allWatchlists: Watchlist[]
}

export interface WatchlistItemTableEntry {
    watchlistItemId: string;
    watchlistId: string;
    movieId: number;
}