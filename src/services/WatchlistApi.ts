import { createApi } from "@reduxjs/toolkit/query/react";
import { WatchlistResponse, AllWatchlistsResponse } from "../types/Watchlist";
import { customBaseQuery } from "./customBaseQuery";

export const watchlistApi = createApi({
    reducerPath: "watchlistApi",
    baseQuery: customBaseQuery,
    endpoints: (builder) => ({
        getWatchlistById: builder.query<WatchlistResponse, string>({
            query: (watchlistId) => `watchlist/getWatchlist/${watchlistId}`,
        }),
        getAllWatchlists: builder.query<AllWatchlistsResponse, void>({
            query: () => "watchlist/getAllWatchlists",
        }),
        createDefaultWatchlists: builder.mutation<void, any>({
            query: ({ watchlistId, watchedListId }) => ({
                url: `watchlist/createDefaultWatchlists/${watchlistId}/${watchedListId}`,
                method: "POST",
            }),
        }),
        addWatchlistItem: builder.mutation<void, any>({
            query: ({ watchlistId, movieId, watchlistItemId }) => ({
                url: `watchlist/addWatchlistItem/${watchlistId}/${movieId}/${watchlistItemId}`,
                method: "POST",
            }),
        }),
        deleteWatchlistItem: builder.mutation<void, any>({
            query: ({ watchlistItemId }) => ({
                url: `watchlist/deleteWatchlistItem/${watchlistItemId}`,
                method: "DELETE",
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
    useAddWatchlistItemMutation,
    useDeleteWatchlistItemMutation,
} = watchlistApi;
