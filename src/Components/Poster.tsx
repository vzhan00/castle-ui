import { useContext, useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "@mui/material";
import { useDeleteWatchlistItemMutation, useAddWatchlistItemMutation } from "../services/WatchlistApi";
import { Watchlist, WatchlistItemProps } from "../types/Watchlist";
import { WatchlistsContext } from "../app/contexts/WatchlistsContext";
import CheckIcon from '@mui/icons-material/Check';

export function Poster({ watchlistItem, watchlistId }: WatchlistItemProps) {
    const context = useContext(WatchlistsContext);
    const watchlists = context?.watchlists;
    const setWatchlists = context?.setWatchlists;
    const watchedListId = context?.watchedListId;
    const [deleteWatchlistItemTrigger] = useDeleteWatchlistItemMutation();
    const [addWatchlistItemTrigger] = useAddWatchlistItemMutation();
    const [isHovered, setIsHovered] = useState(false);

    const handleDeleteClick = () => {
        deleteWatchlistItemTrigger({
            watchlistItemId: watchlistItem.watchlistItemId,
        });
        setWatchlists!(
            watchlists?.map((wl) => {
                if (wl.watchlistId === watchlistId) {
                    const newWLIs = wl.watchlistItems.filter(
                        (item) =>
                            item.watchlistItemId !==
                            watchlistItem.watchlistItemId
                    );
                    const newWL: Watchlist = {
                        ...wl,
                        watchlistItems: newWLIs,
                    };
                    return newWL;
                } else {
                    return wl;
                }
            })
        );
    };
    const handleSeenClick = () => {
        addWatchlistItemTrigger({
            watchlistId: watchedListId,
            movieId: watchlistItem.movie.movieId,
        });
        deleteWatchlistItemTrigger({
            watchlistItemId: watchlistItem.watchlistItemId,
        });
        setWatchlists!(
            watchlists?.map((wl) => {
                if (wl.watchlistId === watchlistId) {
                    const newWLIs = wl.watchlistItems.filter(
                        (item) =>
                            item.watchlistItemId !==
                            watchlistItem.watchlistItemId
                    );
                    const newWL: Watchlist = {
                        ...wl,
                        watchlistItems: newWLIs,
                    };
                    return newWL;
                } else if (wl.watchlistId === watchedListId) {
                    const newWLIs = [...wl.watchlistItems, watchlistItem];
                    const newWL: Watchlist = {
                        ...wl,
                        watchlistItems: newWLIs,
                    };
                    return newWL;
                } else {
                    return wl;
                }
            })
        );
    };
    return (
        <div
            style={{
                position: "relative",
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <img
                src={
                    "https://image.tmdb.org/t/p/w500" +
                    watchlistItem.movie.posterPath
                }
                style={{
                    width: "100px", // Fixed width
                    height: "150px", // Fixed height
                    objectFit: "cover", // Maintain aspect ratio, crop if necessary
                    borderRadius: 10,
                }}
            ></img>
            {isHovered && (
                <Button
                    variant="contained"
                    sx={{
                        borderRadius: "50%",
                        padding: 0,
                        minWidth: 0,
                        backgroundColor: "#141414",
                        height: 25,
                        width: 25,
                        position: "absolute",
                        bottom: 10,
                        right: 13,
                        zIndex: 1,
                    }}
                    onClick={() =>
                        handleDeleteClick()
                    }
                >
                    <DeleteIcon sx={{ fontSize: "medium" }} />
                </Button>
            )}
            {isHovered && watchlistId != watchedListId && (
                <Button
                    variant="contained"
                    sx={{
                        borderRadius: "50%",
                        padding: 0,
                        minWidth: 0,
                        backgroundColor: "#141414",
                        height: 25,
                        width: 25,
                        position: "absolute",
                        bottom: 40,
                        right: 13,
                        zIndex: 1,
                    }}
                    onClick={() =>
                        handleSeenClick()
                    }
                >
                    <CheckIcon sx={{ fontSize: "medium" }} />
                </Button>
            )}
        </div>
    );
}
