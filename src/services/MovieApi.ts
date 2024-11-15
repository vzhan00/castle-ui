import { createApi } from "@reduxjs/toolkit/query/react";
import { WatchlistResponse } from "../types/Watchlist";
import { customBaseQuery } from "./customBaseQuery";
import { MovieSearchResult, MovieSearchResultsResponse } from "../types/Search";

// HAVE TO FINISH THIS ONE
export const movieApi = createApi({
    reducerPath: "movieApi",
    baseQuery: customBaseQuery,
    endpoints: (builder) => ({
        addMovieReview: builder.query<WatchlistResponse, string>({
            query: (movieId) => `movie/addMovieReview/${movieId}`,
        }),
        searchMovie: builder.query<MovieSearchResultsResponse, string>({
            query: (query) => `movie/searchMultiMedia/${query}/1`,
        }),
    }),
});

export const {
    useAddMovieReviewQuery,
    useLazyAddMovieReviewQuery,
    useSearchMovieQuery,
    useLazySearchMovieQuery,
} = movieApi;
