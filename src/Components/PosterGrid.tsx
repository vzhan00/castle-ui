import { WatchlistProps } from "../types/Watchlist";
import { Grid2 } from "@mui/material";
import { Poster } from "./Poster";

export function PosterGrid({ watchlist }: WatchlistProps) {
    const watchlistItems = watchlist.watchlistItems
    return (
        <Grid2 container spacing={4}>
            {watchlistItems.map((watchlistItem) => (
                <Grid2 size={4}><Poster watchlistItem={watchlistItem} watchlistId={watchlist.watchlistId}/></Grid2>
            ))}
        </Grid2>
    );
}
