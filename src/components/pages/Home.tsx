import {
  Box,
  CircularProgress,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";

interface Column {
  id: "title" | "url" | "created_at" | "author";
  label: string;
  minWidth?: number;
  align?: "right";
}

const columns: readonly Column[] = [
  { id: "title", label: "Title", minWidth: 170 },
  { id: "url", label: "URL", minWidth: 150 },
  { id: "created_at", label: "Created At", minWidth: 100 },
  { id: "author", label: "Author", minWidth: 100 },
];

export interface InitPost {
  title: string;
  url: string;
  created_at: Date;
  author: string;
}

const Home: React.FC = () => {
  const history = useHistory();
  // pagination
  const [page, setPage] = useState<number>(0);

  // Local Pagination
  const [localPage, setLocalPage] = useState<number>(0);
  const rowsPerPage: number = 13;
  const [totalElements, setTotalElements] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [posts, setPosts] = useState<InitPost[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setPage((_page) => _page + 1);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    getPost();
  }, [page]);

  const getPost = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        `https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${page}`
      );
      const data = await res.json();
      const _posts = [...posts, ...data.hits];
      setPosts(_posts);
      setTotalElements(_posts.length);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const handleChangePage = async (event: unknown, newPage: number) => {
    console.log(newPage);

    setLocalPage(newPage);
  };

  const getDetails = (post: InitPost) => {
    history.push({
      pathname: "/details",
      state: post,
    });
  };
  return (
    <>
      <h1>This is home page</h1>
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress size={20} />
          Trying to load new posts...
        </Box>
      ) : (
        <></>
      )}
      <Container style={{ maxWidth: "100%" }}>
        <Paper>
          <TableContainer sx={{ height: "768px" }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {posts
                  .slice(
                    localPage * rowsPerPage,
                    localPage * rowsPerPage + rowsPerPage
                  )
                  .map((rowData, index) => {
                    return (
                      <TableRow key={index} onClick={() => getDetails(rowData)}>
                        {columns.map((column) => {
                          const value = rowData[column.id];
                          return <TableCell key={column.id}>{value}</TableCell>;
                        })}
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          {posts.length > 13 && (
            <TablePagination
              rowsPerPageOptions={[]}
              component="div"
              count={totalElements}
              rowsPerPage={rowsPerPage}
              page={localPage}
              onPageChange={handleChangePage}
            />
          )}
        </Paper>
      </Container>
    </>
  );
};

export default Home;
