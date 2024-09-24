import { WatchlistProps } from "../types/Watchlist";
import { Grid2 } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { BiExpandAlt } from "react-icons/bi";
import Box from "@mui/material";

export function PosterGrid({ watchlist }: WatchlistProps) {
    const watchlistItems = watchlist.watchlistItems
    return (
        <Grid2 container spacing={4}>
            {/* <Grid2 size={9}></Grid2>
            <Grid2 size={3}><AddIcon/><BiExpandAlt/></Grid2> */}
            {watchlistItems.map((watchlistItem) => (
                <Grid2 size={4}><img src={'https://image.tmdb.org/t/p/w500' + watchlistItem.movie.posterPath}
                style={{
                    width: '100px',   // Fixed width
                    height: '150px',  // Fixed height
                    objectFit: 'cover', // Maintain aspect ratio, crop if necessary
                    borderRadius: 10
                  }}></img></Grid2>
            ))}
        </Grid2>
    );
}
