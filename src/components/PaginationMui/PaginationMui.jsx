import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { totalPages } from "../../redux/movies/selectors";
import { Container, Pagination } from "@mui/material";

import styles from "./PaginationMui.module.css";

export default function PaginationMui() {
  const [searchParams, setSearchParams] = useSearchParams();
  const pageQty = useSelector(totalPages);
  const currentPage = parseInt(searchParams.get("page")) || 1;
  const searchQuery = searchParams.get("name");

  const handlePageChange = (_, nextPage) => {
    const nextSearchParams = new URLSearchParams(searchParams);

    nextSearchParams.set("page", nextPage);

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
        shape="rounded"
        variant="outlined"
        page={currentPage}
        onChange={handlePageChange}
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
          "& .MuiPaginationItem-ellipsis": {
            color: "#9ea7b8",
          },
        }}
      />
    </Container>
  );
}
