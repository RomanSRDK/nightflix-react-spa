import { createSlice } from "@reduxjs/toolkit";
import {
  getActorsCast,
  getMovieById,
  getMoviesByName,
  getReviews,
  getTrailerMovie,
  getTrendingMovies,
} from "./operations";

export const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    items: [],
    movieInfo: null,
    trailer: [],
    foundMovies: [],
    castInfo: [],
    reviewsInfo: [],
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
      })
      .addCase(getTrailerMovie.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTrailerMovie.fulfilled, (state, action) => {
        state.isLoading = false;
        state.trailer = action.payload;
      })
      .addCase(getMoviesByName.fulfilled, (state, action) => {
        state.foundMovies = action.payload;
      })
      .addCase(getActorsCast.fulfilled, (state, action) => {
        state.castInfo = action.payload;
      })
      .addCase(getReviews.fulfilled, (state, action) => {
        state.reviewsInfo = action.payload;
      });
  },
});

export const { setCurrentPage } = moviesSlice.actions;
export default moviesSlice.reducer;
