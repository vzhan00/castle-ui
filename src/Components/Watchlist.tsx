import { Container } from "@mui/material";
import { Watchlist } from "../types/Watchlist";

interface WatchlistProps {
    watchlist: Watchlist;
}

export function WatchlistView({ watchlist }: WatchlistProps) {
    return (
        <Container>
            <div>{watchlist.watchlistId}</div>
            <div>{watchlist.watchlistName}</div>
            {watchlist.movies.map(movie => (
                <div>
                    <div>{movie.movieId}</div>
                    <div>{movie.title}</div>
                    <div>{movie.director}</div>
                </div>
            ))}
        </Container>
    )
}