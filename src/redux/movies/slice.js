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
    totalPages: 0,
  },
  reducers: {
    clearFoundMovies: (state) => {
      state.foundMovies = [];
      state.totalPages = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTrendingMovies.pending, (state) => {
        state.isLoading = true;
        state.items = [];
        state.totalPages = 0;
      })
      .addCase(getTrendingMovies.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload.results;
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
        state.trailer = [];
      })
      .addCase(getTrailerMovie.fulfilled, (state, action) => {
        state.isLoading = false;
        state.trailer = action.payload;
      })
      .addCase(getMoviesByName.pending, (state) => {
        state.isLoading = true;
        state.foundMovies = [];
        state.totalPages = 0;
      })
      .addCase(getMoviesByName.fulfilled, (state, action) => {
        state.isLoading = false;
        state.foundMovies = action.payload.results;
        state.totalPages = action.payload.total_pages;
      })
      .addCase(getActorsCast.pending, (state) => {
        state.isLoading = true;
        state.castInfo = [];
      })
      .addCase(getActorsCast.fulfilled, (state, action) => {
        state.isLoading = false;
        state.castInfo = action.payload;
      })
      .addCase(getReviews.pending, (state) => {
        state.isLoading = true;
        state.reviewsInfo = [];
      })
      .addCase(getReviews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.reviewsInfo = action.payload;
      });
  },
});

export const { clearFoundMovies } = moviesSlice.actions;
export default moviesSlice.reducer;
