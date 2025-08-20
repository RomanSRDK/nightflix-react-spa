import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { totalPages } from "../../redux/movies/selectors";
import { Container, Pagination, PaginationItem } from "@mui/material";

function PaginationMui({ currentPage, handlePageChange }) {
  const pageQty = useSelector(totalPages);
  return (
    <Container sx={{ my: 5, display: "flex", justifyContent: "center" }}>
      <Pagination
        count={pageQty}
        page={currentPage}
        onChange={handlePageChange}
        variant="outlined"
        shape="rounded"
        sx={{
          "& .MuiPaginationItem-root": {
            color: "#ebeef5", // светлый текст
            backgroundColor: "transparent",
            borderRadius: "8px",
          },
          "& .MuiPaginationItem-root.Mui-selected": {
            backgroundColor: "#ffb74d", // тёплый акцент (оранжевый в духе рейтингов)
            color: "#1e1e1e", // тёмный текст для контраста
            fontWeight: "bold",
          },
          "& .MuiPaginationItem-root:hover": {
            backgroundColor: "rgba(255, 183, 77, 0.15)", // мягкий полупрозрачный акцент
          },
          "& .MuiPaginationItem-ellipsis": {
            color: "#9ea7b8", // серый для троеточия
          },
        }}
        renderItem={(item) => (
          <PaginationItem
            component={Link}
            to={`/?page=${item.page}`}
            {...item}
          />
        )}
      />
    </Container>
  );
}

export default PaginationMui;
