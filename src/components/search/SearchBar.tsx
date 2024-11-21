import React, { useState, useContext } from "react";
import Autosuggest from "react-autosuggest";
import { MovieSearchResult } from "../../types/Search";
import { useLazySearchMovieQuery } from "../../services/MovieApi";
import "./SearchBar.css";
import { Watchlist } from "../../types/Watchlist";
import { WatchlistsContext } from "../../contexts/WatchlistsContext";
import { SearchBarSuggestion } from "./SearchBarSuggestion";

interface searchValue {
    value: string;
}

interface SearchBarProp {
    watchlist: Watchlist;
    closeModal: () => void;
}

export default function SearchBar({ watchlist, closeModal }: SearchBarProp) {
    const context = useContext(WatchlistsContext);
    const watchlists = context?.watchlists;
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState<MovieSearchResult[]>([]);
    const [searchMovieTrigger] = useLazySearchMovieQuery();

    const fetchSuggestions = async (value: string) => {
        const response = await searchMovieTrigger(value);
        const searchResults = response.data?.searchResults;
        if (searchResults) {
            if (searchResults.length > 8) {
                setSuggestions(searchResults?.slice(0, 8));
            } else {
                setSuggestions(searchResults);
            }
        }
    };

    const onSuggestionsFetchRequested = ({ value }: searchValue) => {
        fetchSuggestions(value);
    };

    const onSuggestionsClearRequested = () => {
        setSuggestions([]);
    };

    const getSuggestionValue = (suggestion: MovieSearchResult) =>
        suggestion.title;

    const renderSuggestion = (suggestion: MovieSearchResult) => (
        <SearchBarSuggestion
            watchlist={watchlist}
            suggestion={suggestion}
            isLast={suggestion === suggestions[suggestions.length - 1]}
            closeModal={closeModal}
        />
    );

    return (
        <div style={{ paddingTop: 100 }} onClick={closeModal}>
            <Autosuggest
                suggestions={suggestions}
                onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                onSuggestionsClearRequested={onSuggestionsClearRequested}
                getSuggestionValue={getSuggestionValue}
                renderSuggestion={renderSuggestion}
                inputProps={{
                    placeholder: "Search Movie",
                    value: query,
                    onChange: (_, { newValue }) => setQuery(newValue),
                    className: query === "" || !suggestions || suggestions.length == 0 ? "input-empty" : "input-filled",
                    onClick: (e) => e.stopPropagation()
                }}
            />
        </div>
    );
}
