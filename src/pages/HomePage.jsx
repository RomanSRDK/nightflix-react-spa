import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Link, useSearchParams } from "react-router-dom";

import { Container, Pagination, PaginationItem } from "@mui/material";

import MovieList from "../components/MovieList/MovieList";
import Loader from "../components/Loader/Loader";

import { getTrendingMovies } from "../redux/movies/operations";
import { totalPages, trendingMovies } from "../redux/movies/selectors";
import { setCurrentPage } from "../redux/movies/slice";

function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get("page")) || 1;

  const dispatch = useDispatch();
  const movies = useSelector(trendingMovies);
  const pageQty = useSelector(totalPages);

  useEffect(() => {
    dispatch(setCurrentPage(currentPage));
    dispatch(getTrendingMovies({ timeWindow: "day", page: currentPage }));
  }, [dispatch, currentPage]);

  const handlePageChange = (_, newPage) => {
    setSearchParams({ page: newPage });
  };

  return (
    <>
      {movies.length > 0 ? (
        <>
          <MovieList movies={movies} />
          <Container sx={{ my: 5, display: "flex", justifyContent: "center" }}>
            <Pagination
              count={pageQty}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
              variant="outlined"
              shape="rounded"
              renderItem={(item) => (
                <PaginationItem
                  component={Link}
                  to={`/?page=${item.page}`}
                  {...item}
                />
              )}
            />
          </Container>
        </>
      ) : (
        <Loader />
      )}
    </>
  );
}

export default HomePage;
