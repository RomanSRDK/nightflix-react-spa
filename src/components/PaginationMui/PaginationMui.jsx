import { Link, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { totalPages } from "../../redux/movies/selectors";
import { Container, Pagination, PaginationItem } from "@mui/material";

function PaginationMui() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get("page")) || 1;
  const searchQuery = searchParams.get("name");
  const pageQty = useSelector(totalPages);

  const handlePageChange = (_, newPage) => {
    const nextSearchParams = new URLSearchParams(searchParams);
    nextSearchParams.set("page", newPage);

    if (!searchQuery) {
      nextSearchParams.delete("name");
    }

    setSearchParams(nextSearchParams);

    window.scrollTo(0, 0);
  };

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
            backgroundColor: "#ffb74d",
            color: "#1e1e1e", // тёмный текст для контраста
            fontWeight: "bold",
          },
          // ✅ Отключаем hover для выбранного элемента
          "& .MuiPaginationItem-root.Mui-selected:hover": {
            backgroundColor: "#ffb74d",
          },
          "& .MuiPaginationItem-root:hover": {
            backgroundColor: "rgba(255, 183, 77, 0.15)", // мягкий полупрозрачный акцент
          },
          "& .MuiPaginationItem-ellipsis": {
            color: "#9ea7b8", // серый для троеточия
          },
        }}
        renderItem={(item) => {
          const params = new URLSearchParams();
          if (searchQuery) params.set("name", searchQuery);
          params.set("page", item.page);

          return (
            <PaginationItem
              component={Link}
              to={`?${params.toString()}`}
              {...item}
            />
          );
        }}
      />
    </Container>
  );
}

export default PaginationMui;
