import { configureStore } from "@reduxjs/toolkit";
import trendingMoviesReducer from "./trendingMovies/slice";

export const store = configureStore({
  reducer: {
    trendingMovies: trendingMoviesReducer,
  },
});
