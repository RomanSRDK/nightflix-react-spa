import { lazy, Suspense } from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import Header from "../Header/Header";
import MovieCast from "../MovieCast/MovieCast";
import MovieReviews from "../MovieReviews/MovieReviews";
import Loader from "../Loader/Loader";

const HomePage = lazy(() => import("../../pages/HomePage"));
const SearchPage = lazy(() => import("../../pages/SearchPage"));
const MovieDetailsPage = lazy(() => import("../../pages/MovieDetailsPage"));
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
        {/* Маршруты с Header */}
        <Route element={<LayoutWithHeader />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>

        {/* Маршруты без Header */}
        <Route element={<LayoutWithoutHeader />}>
          <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
            <Route path="cast" element={<MovieCast />} />
            <Route path="reviews" element={<MovieReviews />} />
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
