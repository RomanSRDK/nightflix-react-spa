import { lazy, Suspense } from "react";

import { Toaster } from "react-hot-toast";
import { Outlet, Route, Routes } from "react-router-dom";

import Header from "../Header/Header";
import Loader from "../Loader/Loader";
import MovieCast from "../MovieCast/MovieCast";
import MovieReviews from "../MovieReviews/MovieReviews";

const HomePage = lazy(() => import("../../pages/HomePage"));
const SearchPage = lazy(() => import("../../pages/SearchPage"));
const MovieDetailsPage = lazy(() => import("../../pages/MovieDetailsPage"));
const MovieAssistantPage = lazy(() => import("../../pages/MovieAssistantPage"));
const FavoritesPage = lazy(() => import("../../pages/FavoritesPage"));
const NotFoundPage = lazy(() => import("../../pages/NotFoundPage"));

function LayoutWithHeader() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

function LayoutWithoutHeader() {
  return <Outlet />;
}

function App() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        {/* Routes with Header */}
        <Route element={<LayoutWithHeader />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/movie-assistant" element={<MovieAssistantPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>

        {/* Routes without Header */}
        <Route element={<LayoutWithoutHeader />}>
          <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
            <Route path="cast" element={<MovieCast />} />
            <Route path="reviews" element={<MovieReviews />} />
          </Route>
        </Route>
      </Routes>
      <Toaster />
    </Suspense>
  );
}

export default App;
