import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { WatchlistResponse, Watchlist, AllWatchlistsResponse } from "../types/Watchlist";
import { customBaseQuery } from "./customBaseQuery";


// HAVE TO FINISH THIS ONE
export const movieApi = createApi({
    reducerPath: "movieApi",
    baseQuery: customBaseQuery,
    endpoints: (builder) => ({
        getWatchlistById: builder.query<WatchlistResponse, string>({
            query: (movieId) => `movie/addMovieReview/${movieId}`,
        }),
    }),
});

export const {
} = movieApi;
