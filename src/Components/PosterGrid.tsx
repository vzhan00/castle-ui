import { WatchlistProps } from "../types/Watchlist";
import { Grid2 } from "@mui/material";

export function PosterGrid({ watchlist }: WatchlistProps) {
    const watchlistItems = watchlist.watchlistItems
    return (
        <Grid2 container spacing={1}>
            {watchlistItems.map((watchlistItem) => (
                <Grid2 size={4}><img src={'https://image.tmdb.org/t/p/w500' + watchlistItem.movie.posterPath}
                style={{
                    width: '100px',   // Fixed width
                    height: '150px',  // Fixed height
                    objectFit: 'cover', // Maintain aspect ratio, crop if necessary
                    borderRadius: 5
                  }}></img></Grid2>
            ))}
        </Grid2>
    );
}
