import React, { useState, useContext } from "react";
import Autosuggest from "react-autosuggest";
import { Movie } from "../../types/Movie";
import { MovieSearchResult } from "../../types/Search";
import { Box } from "@mui/material";
import { useLazySearchMovieQuery } from "../../services/MovieApi";
import "./SearchBar.css";
import { useAddWatchlistItemMutation } from "../../services/WatchlistApi";
import { Watchlist, WatchlistItem } from "../../types/Watchlist";
import { WatchlistsContext } from "../../app/contexts/WatchlistsContext";

interface searchValue {
    value: string;
}

interface SearchBarProp {
    watchlist: Watchlist;
    closeModal: () => void;
}

export function SearchBar({ watchlist, closeModal }: SearchBarProp) {
    const context = useContext(WatchlistsContext);
    const watchlists = context?.watchlists;
    const setWatchlists = context?.setWatchlists;
    console.log("in searchbar");
    console.log(watchlists);
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState<MovieSearchResult[]>([]);
    const [searchMovieTrigger] = useLazySearchMovieQuery();
    const [addWatchlistItemTrigger] = useAddWatchlistItemMutation();

    const fetchSuggestions = async (value: string) => {
        const response = await searchMovieTrigger(value);
        const searchResults = response.data?.searchResults;
        console.log("search results");
        console.log(searchResults);
        if (searchResults) {
            setSuggestions(searchResults);
        }
    };

    const onSuggestionsFetchRequested = ({ value }: searchValue) => {
        fetchSuggestions(value);
    };

    const onSuggestionsClearRequested = () => {
        setSuggestions([]);
    };

    const handleClick = (movie: Movie) => {
        closeModal();
        addWatchlistItemTrigger({
            watchlistId: watchlist.watchlistId,
            movieId: movie.movieId,
        });
        const maxId = Math.max(
            ...watchlist.watchlistItems.map((item) => item.watchlistItemId)
        );
        const newWLI: WatchlistItem = {
            watchlistItemId: maxId + 1,
            movie: movie,
        };

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
    };

    const getSuggestionValue = (suggestion: MovieSearchResult) =>
        suggestion.title;

    const renderSuggestion = (suggestion: MovieSearchResult) => (
        <Box
            sx={{
                bgcolor: "rgba(255, 255, 255, 0.3)",
            }}
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
            <img
                src={"https://image.tmdb.org/t/p/w500" + suggestion.posterPath}
                style={{
                    width: "20px", // Fixed width
                    height: "30px", // Fixed height
                    objectFit: "cover", // Maintain aspect ratio, crop if necessary
                    borderRadius: 2,
                }}
            ></img>
            {suggestion.title}
        </Box>
    );

    return (
        <div>
            <Autosuggest
                suggestions={suggestions}
                onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                onSuggestionsClearRequested={onSuggestionsClearRequested}
                getSuggestionValue={getSuggestionValue}
                renderSuggestion={renderSuggestion}
                inputProps={{
                    placeholder: "Search",
                    value: query,
                    onChange: (_, { newValue }) => setQuery(newValue),
                }}
            />
        </div>
    );
}
