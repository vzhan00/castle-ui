import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { WatchlistResponse, Watchlist, AllWatchlistsResponse } from "../types/Watchlist";
import { customBaseQuery } from "./customBaseQuery";

export const watchlistApi = createApi({
    reducerPath: "watchlistApi",
    baseQuery: customBaseQuery,
    endpoints: (builder) => ({
        getWatchlistById: builder.query<WatchlistResponse, string>({
            query: (watchlistId) => `watchlist/getWatchlist/${watchlistId}`,
        }),
        getAllWatchlists: builder.query<AllWatchlistsResponse, void>({
            query: () => 'watchlist/getAllWatchlists',
        }),
        createDefaultWatchlists: builder.mutation<void, void>({
            query: () => ({
                url: 'watchlist/createDefaultWatchlists',
                method: 'POST',
            }),
        }),
    }),
});

export const {
    useGetWatchlistByIdQuery,
    useLazyGetWatchlistByIdQuery,
    useGetAllWatchlistsQuery,
    useLazyGetAllWatchlistsQuery,
    useCreateDefaultWatchlistsMutation,
} = watchlistApi;
