import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Watchlist } from '../types/Watchlist'

export const watchlistApi = createApi({
  reducerPath: 'watchlistApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:31000/watchlist/' }),
  endpoints: (builder) => ({
    getWatchlistById: builder.query<Watchlist, string>({
      query: (watchlistId) => `getWatchlist/${watchlistId}`,
    }),
  }),
})

export const { useGetWatchlistByIdQuery, useLazyGetWatchlistByIdQuery } = watchlistApi