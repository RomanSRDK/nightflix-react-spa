import { createAsyncThunk } from "@reduxjs/toolkit";
import { tmdbApi } from "../../services/tmdbApi";

export const getTrendingMovies = createAsyncThunk(
  "movies/getTrending",
  async ({ timeWindow, page }, ThunkAPI) => {
    try {
      const { data } = await tmdbApi.get(
        `/trending/movie/${timeWindow}?page=${page}`
      );
      return data;
    } catch (error) {
      return ThunkAPI.rejectWithValue(error);
    }
  }
);

export const getMovieById = createAsyncThunk(
  "movies/getMovieById",
  async (movieId, ThunkAPI) => {
    try {
      const { data } = await tmdbApi.get(`/movie/${movieId}`);
      return data;
    } catch (error) {
      return ThunkAPI.rejectWithValue(error);
    }
  }
);

export const getTrailerMovie = createAsyncThunk(
  "movies/getTrailerMovie",
  async (movieId, ThunkAPI) => {
    try {
      const { data } = await tmdbApi.get(`/movie/${movieId}/videos`);
      return data.results.filter(({ type }) => type === "Trailer");
    } catch (error) {
      return ThunkAPI.rejectWithValue(error);
    }
  }
);

export const getMoviesByName = createAsyncThunk(
  "movies/getMoviesByName",
  async ({ debouncedQuery, page }, ThunkAPI) => {
    try {
      const { data } = await tmdbApi.get(
        `/search/movie?query=${debouncedQuery}&page=${page}`
      );
      return data;
    } catch (error) {
      return ThunkAPI.rejectWithValue(error);
    }
  }
);

export const getActorsCast = createAsyncThunk(
  "movies/getActorsCast",
  async (movieId, ThunkAPI) => {
    try {
      const { data } = await tmdbApi.get(
        `/movie/${movieId}/credits?language=en-US`
      );
      return data.cast;
    } catch (error) {
      return ThunkAPI.rejectWithValue(error);
    }
  }
);

export const getReviews = createAsyncThunk(
  "movies/getReviews",
  async (movieId, ThunkAPI) => {
    try {
      const { data } = await tmdbApi.get(
        `/movie/${movieId}/reviews?language=en-US`
      );
      return data.results;
    } catch (error) {
      return ThunkAPI.rejectWithValue(error);
    }
  }
);

export const getFavoriteMovies = createAsyncThunk(
  "movies/getFavoriteMovies",
  async (movieIds, ThunkAPI) => {
    try {
      const requests = movieIds.map((movieId) =>
        tmdbApi.get(`/movie/${movieId}`)
      );

      const responses = await Promise.all(requests);

      return responses.map(({ data }) => data);
    } catch (error) {
      return ThunkAPI.rejectWithValue(error);
    }
  }
);
