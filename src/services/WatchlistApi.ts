import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { WatchlistResponse, Watchlist, AllWatchlistsResponse } from "../types/Watchlist";
import { customBaseQuery } from "./customBaseQuery";

export const watchlistApi = createApi({
    reducerPath: "watchlistApi",
    baseQuery: customBaseQuery,
    endpoints: (builder) => ({
        getWatchlistById: builder.query<WatchlistResponse, string>({
            query: (watchlistId) => `getWatchlist/${watchlistId}`,
        }),
        getAllWatchlists: builder.query<AllWatchlistsResponse, void>({
            query: () => `getAllWatchlists`,
        }),
    }),
});

export const {
    useGetWatchlistByIdQuery,
    useLazyGetWatchlistByIdQuery,
    useGetAllWatchlistsQuery,
    useLazyGetAllWatchlistsQuery,
} = watchlistApi;
