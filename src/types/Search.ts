export interface MovieSearchResult {
    movieId: number;
    title: string;
    overview: string;
    posterPath: string;
    releaseDate: string;
}

export interface MovieSearchResultsResponse {
    searchResults: MovieSearchResult[]
}