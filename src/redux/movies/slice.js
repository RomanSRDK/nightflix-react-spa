import { createSlice } from "@reduxjs/toolkit";
import { getMovieById, getTrendingMovies } from "./operations";

export const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    items: [],
    movieInfo: null,
    isLoading: false,
    currentPage: 0,
    totalPages: 0,
  },
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTrendingMovies.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTrendingMovies.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload.results;
        // state.currentPage = action.payload.page;
        state.totalPages = action.payload.total_pages;
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

export const { setCurrentPage } = moviesSlice.actions;
export default moviesSlice.reducer;
