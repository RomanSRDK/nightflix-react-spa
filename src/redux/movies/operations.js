import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const AUTH_TOKEN =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzOTQzM2E0M2MwOGVlZGNlM2JiZmNiYjEwZTk2NzFhOSIsIm5iZiI6MTc0OTg5NjUwNi4zOTIsInN1YiI6IjY4NGQ0ZDNhMWQ2YzRhNDc0ZWJiNGE3OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.QdPDsg81ywDhazmprFyPiSM7lF9J4OAq_E-SSVhqDTw";

axios.defaults.baseURL = "https://api.themoviedb.org/3";
axios.defaults.headers.common["Authorization"] = AUTH_TOKEN;

export const getTrendingMovies = createAsyncThunk(
  "movies/getTranding",
  async ({ timeWindow, page }, ThunkAPI) => {
    try {
      const { data } = await axios.get(
        `/trending/movie/${timeWindow}?page=${page}`
      );
      console.log(data);
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
      const { data } = await axios.get(`/movie/${movieId}`);
      console.log(data);
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
      const { data } = await axios.get(`/movie/${movieId}/videos`);
      return data.results.filter(({ type }) => type === "Trailer");
    } catch (error) {
      return ThunkAPI.rejectWithValue(error);
    }
  }
);
