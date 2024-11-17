import React, { useState, useContext } from "react";
import { Movie } from "../../types/Movie";
import { MovieSearchResult } from "../../types/Search";
import { Box } from "@mui/material";
import "./SearchBar.css";
import { useAddWatchlistItemMutation } from "../../services/WatchlistApi";
import { Watchlist, WatchlistItem } from "../../types/Watchlist";
import { WatchlistsContext } from "../../app/contexts/WatchlistsContext";
import { v4 as uuidv4 } from "uuid";

interface SearchBarSuggestionProp {
    watchlist: Watchlist;
    suggestion: MovieSearchResult;
    isLast: boolean;
    closeModal: () => void;
}

export function SearchBarSuggestion({ watchlist, suggestion, isLast, closeModal }: SearchBarSuggestionProp) {
    const context = useContext(WatchlistsContext);
    const watchlists = context?.watchlists;
    const setWatchlists = context?.setWatchlists;
    const [addWatchlistItemTrigger] = useAddWatchlistItemMutation();
    const [isHovered, setIsHovered] = useState(false);

    const handleClick = (movie: Movie) => {
        closeModal();
        const newWatchlistItemId = uuidv4()
        const newWLI: WatchlistItem = {
            watchlistItemId: newWatchlistItemId,
            movie: movie,
        };
        addWatchlistItemTrigger({
            watchlistId: watchlist.watchlistId,
            movieId: movie.movieId,
            watchlistItemId: newWatchlistItemId
        });
        

        setWatchlists!(
            watchlists?.map((wl) => {
                if (wl.watchlistId === watchlist.watchlistId) {
                    const newWLIs = [...wl.watchlistItems, newWLI];
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
        console.log(watchlists);
    };

    return (
        <Box
            sx={{
                fontSize: 24,
                width: 830,
                overflow: "hidden",
                textOverflow: "ellipsis",
                bgcolor: isHovered ? "rgba(200, 200, 200, 0.6)" : "rgba(230, 230, 230, 0.6)",
                color: "#2A2F34",
                borderBottomLeftRadius: isLast ? 8 : 0,
                borderBottomRightRadius: isLast ? 8 : 0,
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => {
                const newMovie: Movie = {
                    movieId: suggestion.movieId,
                    posterPath: suggestion.posterPath,
                    director: "",
                    title: suggestion.title,
                };
                handleClick(newMovie);
            }}
        >
            <div style={{display: "flex", alignItems: "center"}}>
            <img
                src={"https://image.tmdb.org/t/p/w500" + suggestion.posterPath}
                style={{
                    width: "50px", // Fixed width
                    height: "75px", // Fixed height
                    objectFit: "cover", // Maintain aspect ratio, crop if necessary
                    borderRadius: 8,
                    marginLeft: 10,
                    marginRight: 10,
                    marginBottom: 5,
                    marginTop: 5
                }}
            ></img>
            {suggestion.title + " (" + suggestion.releaseDate.slice(0, 4) + ")"}</div>
        </Box>
    )
}
