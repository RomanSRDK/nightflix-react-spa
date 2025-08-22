import { lazy, Suspense } from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import Header from "./components/Header/Header";
import MovieCast from "./components/MovieCast/MovieCast";
import MovieReviews from "./components/MovieReviews/MovieReviews";

const HomePage = lazy(() => import("./pages/HomePage"));
const SearchPage = lazy(() => import("./pages/SearchPage"));
const MovieDetailsPage = lazy(() => import("./pages/MovieDetailsPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

// Layout с Header
function LayoutWithHeader() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

// Layout без Header
function LayoutWithoutHeader() {
  return <Outlet />;
}

function App() {
  return (
    <Suspense fallback={null}>
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
