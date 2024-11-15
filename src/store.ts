import { configureStore } from "@reduxjs/toolkit";

import { setupListeners } from "@reduxjs/toolkit/query";
import { watchlistApi } from "./services/WatchlistApi";
import { movieApi } from "./services/MovieApi";

export const store = configureStore({
    reducer: {
        // Add the generated reducer as a specific top-level slice
        [watchlistApi.reducerPath]: watchlistApi.reducer,
        [movieApi.reducerPath]: movieApi.reducer,
    },
    // Adding the api middleware enables caching, invalidation, polling,
    // and other useful features of `rtk-query`.
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat([
            watchlistApi.middleware,
            movieApi.middleware,
        ]),
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);
