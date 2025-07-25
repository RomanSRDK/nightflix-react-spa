import { createSlice } from "@reduxjs/toolkit";
import { getMovieById, getTrendingMovies } from "./operations";

export const trendingMoviesSlice = createSlice({
  name: "movies",
  initialState: {
    items: [],
    movieInfo: null,
    isLoading: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTrendingMovies.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTrendingMovies.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload.results;
      })
      .addCase(getMovieById.pending, (state) => {
        state.isLoading = true;
        state.movieInfo = null;
      })
      .addCase(getMovieById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.movieInfo = action.payload;
      });
  },
});

export default trendingMoviesSlice.reducer;
