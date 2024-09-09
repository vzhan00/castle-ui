import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { WatchlistResponse } from '../types/Watchlist'
import { customBaseQuery } from './customBaseQuery'

export const watchlistApi = createApi({
  reducerPath: 'watchlistApi',
  baseQuery: customBaseQuery,
  endpoints: (builder) => ({
    getWatchlistById: builder.query<WatchlistResponse, string>({
      query: (watchlistId) => `getWatchlist/${watchlistId}`,
    }),
  }),
})

export const { useGetWatchlistByIdQuery, useLazyGetWatchlistByIdQuery } = watchlistApi