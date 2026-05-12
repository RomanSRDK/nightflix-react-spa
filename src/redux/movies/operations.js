import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const myToken = import.meta.env.VITE_TMDB_TOKEN;

axios.defaults.baseURL = "https://api.themoviedb.org/3";
axios.defaults.headers.common["Authorization"] = `Bearer ${myToken}`;

export const getTrendingMovies = createAsyncThunk(
  "movies/getTranding",
  async ({ timeWindow, page }, ThunkAPI) => {
    try {
      const { data } = await axios.get(
        `/trending/movie/${timeWindow}?page=${page}`,
      );
      console.log(data);
      return data;
    } catch (error) {
      return ThunkAPI.rejectWithValue(error);
    }
  },
);

export const getMovieById = createAsyncThunk(
  "movies/getMovieById",
  async (movieId, ThunkAPI) => {
    try {
      const { data } = await axios.get(`/movie/${movieId}`);
      console.log(data);
      return data;
    } catch (error) {
      return ThunkAPI.rejectWithValue(error);
    }
  },
);

export const getTrailerMovie = createAsyncThunk(
  "movies/getTrailerMovie",
  async (movieId, ThunkAPI) => {
    try {
      const { data } = await axios.get(`/movie/${movieId}/videos`);
      return data.results.filter(({ type }) => type === "Trailer");
    } catch (error) {
      return ThunkAPI.rejectWithValue(error);
    }
  },
);

export const getMoviesByName = createAsyncThunk(
  "movies/getMoviesByName",
  async ({ debouncedQuery, page }, ThunkAPI) => {
    try {
      const { data } = await axios.get(
        `/search/movie?query=${debouncedQuery}&page=${page}`,
      );
      console.log(data);
      return data;
    } catch (error) {
      return ThunkAPI.rejectWithValue(error);
    }
  },
);

export const getActorsCast = createAsyncThunk(
  "movies/getActorsCast",
  async (movieId, ThunkAPI) => {
    try {
      const { data } = await axios.get(
        `/movie/${movieId}/credits?language=en-US`,
      );
      console.log(data.cast);
      return data.cast;
    } catch (error) {
      return ThunkAPI.rejectWithValue(error);
    }
  },
);

export const getReviews = createAsyncThunk(
  "movies/getReviews",
  async (movieId, ThunkAPI) => {
    try {
      const { data } = await axios.get(
        `/movie/${movieId}/reviews?language=en-US`,
      );
      console.log(data.results);
      return data.results;
    } catch (error) {
      return ThunkAPI.rejectWithValue(error);
    }
  },
);
