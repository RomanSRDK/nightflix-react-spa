import { createSlice } from "@reduxjs/toolkit";
import {
  getActorsCast,
  getMovieById,
  getMoviesByName,
  getReviews,
  getTrailerMovie,
  getTrendingMovies,
  getFavoriteMovies,
} from "./operations";
import toast from "react-hot-toast";

const getFavoritesFromLocalStorage = () => {
  try {
    const favorites = localStorage.getItem("favorites");

    return favorites ? JSON.parse(favorites) : [];
  } catch {
    toast.error("Failed to read favorites");
    return [];
  }
};

export const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    items: [],
    favorites: getFavoritesFromLocalStorage(),
    favoriteMovies: [],
    isFavoritesLoading: false,
    movieInfo: null,
    trailers: [],
    foundMovies: [],
    castInfo: [],
    reviewsInfo: [],
    isSearched: false,
    isLoading: false,
    error: null,
    totalPages: 0,
  },
  reducers: {
    clearFavoriteMovies: (state) => {
      state.favoriteMovies = [];
    },
    clearFoundMovies: (state) => {
      state.foundMovies = [];
      state.totalPages = 0;
      state.isSearched = false;
    },

    toggleFavorite: (state, action) => {
      const movieId = action.payload;

      const isFavorite = state.favorites.includes(movieId);

      isFavorite
        ? (state.favorites = state.favorites.filter((id) => id !== movieId))
        : state.favorites.unshift(movieId);

      localStorage.setItem("favorites", JSON.stringify(state.favorites));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTrendingMovies.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        // state.items = [];
        // state.totalPages = 0;
      })
      .addCase(getTrendingMovies.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload.results;
        state.totalPages = action.payload.total_pages;
      })
      .addCase(getTrendingMovies.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(getMovieById.pending, (state) => {
        state.isLoading = true;
        state.movieInfo = null;
        state.error = null;
      })
      .addCase(getMovieById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.movieInfo = action.payload;
        state.error = null;
      })
      .addCase(getMovieById.rejected, (state, action) => {
        state.isLoading = false;
        state.movieInfo = null;
        state.error = action.payload ?? {
          status: 500,
          message: "Failed to load movie details",
        };
      })
      .addCase(getTrailerMovie.pending, (state) => {
        state.isLoading = true;
        state.trailers = [];
      })
      .addCase(getTrailerMovie.fulfilled, (state, action) => {
        state.isLoading = false;
        state.trailers = action.payload;
      })
      .addCase(getMoviesByName.pending, (state) => {
        state.isLoading = true;
        state.isSearched = false;
        state.foundMovies = [];
        // state.totalPages = 0;
      })
      .addCase(getMoviesByName.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSearched = true;
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
      })
      .addCase(getFavoriteMovies.pending, (state) => {
        state.isFavoritesLoading = true;
        state.error = null;
      })
      .addCase(getFavoriteMovies.fulfilled, (state, action) => {
        state.isFavoritesLoading = false;
        state.favoriteMovies = action.payload;
      })
      .addCase(getFavoriteMovies.rejected, (state, action) => {
        state.isFavoritesLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearFoundMovies, toggleFavorite, clearFavoriteMovies } =
  moviesSlice.actions;
export default moviesSlice.reducer;
