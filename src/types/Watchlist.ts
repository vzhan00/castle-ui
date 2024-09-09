import { Movie } from "./Movie";

export interface WatchlistResponse {
    watchlist: Watchlist;
}

export interface Watchlist {
    watchlistId: number;
    watchlistName: string;
    movies: Movie[];
}