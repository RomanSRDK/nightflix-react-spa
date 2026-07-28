import { Container, Pagination, PaginationItem } from "@mui/material";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { totalPages } from "../../redux/movies/selectors";
import styles from "./PaginationMui.module.css";

export default function PaginationMui() {
  const [searchParams, setSearchParams] = useSearchParams();
  const pageQty = useSelector(totalPages) ?? 0;

  const currentPage = Number(searchParams.get("page")) || 1;
  const searchQuery = searchParams.get("name");

  if (pageQty <= 1) {
    return null;
  }

  const handlePageChange = (_, nextPage) => {
    if (nextPage === currentPage) {
      return;
    }

    const nextSearchParams = new URLSearchParams(searchParams);

    nextSearchParams.set("page", String(nextPage));

    if (!searchQuery) {
      nextSearchParams.delete("name");
    }

    setSearchParams(nextSearchParams);

    window.scrollTo(0, 0);
  };

  return (
    <Container className={styles.container}>
      <Pagination
        count={pageQty}
        page={currentPage}
        onChange={handlePageChange}
        shape="rounded"
        variant="outlined"
        renderItem={(item) => (
          <PaginationItem
            {...item}
            disabled={item.type === "page" && item.page === currentPage}
          />
        )}
        sx={{
          "& .MuiPaginationItem-root": {
            color: "#ebeef5",
            backgroundColor: "transparent",
            borderRadius: "8px",
          },

          "& .MuiPaginationItem-root.Mui-selected": {
            backgroundColor: "#ffb74d",
            color: "#1e1e1e",
            fontWeight: "bold",
          },

          "& .MuiPaginationItem-root:hover:not(.Mui-selected)": {
            backgroundColor: "rgba(255, 183, 77, 0.15)",
          },

          "& .MuiPaginationItem-root.Mui-selected.Mui-disabled": {
            color: "#1e1e1e",
            backgroundColor: "#ffb74d",
            opacity: 1,
            cursor: "default",
            pointerEvents: "none",
          },

          "& .MuiPaginationItem-ellipsis": {
            color: "#9ea7b8",
          },
        }}
      />
    </Container>
  );
}
