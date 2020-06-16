import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { ThemeProvider, Box, Button, Flex } from "theme-ui";

const ReactPaginationComponent = ({
  text = "#000",
  background = "#fff",
  primary = "#33e",
}) => {
  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const theme = {
    colors: {
      text,
      background,
      primary,
    },
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await fetch(
      `https://hn.algolia.com/api/v1/search?query=javascript&hitsPerPage=5&page=${currentPage}`
    );
    const data = await response.json();

    setData(data.hits);
    setTotalPages(data.nbPages);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    fetchData();
  };

  const listNode = () => {
    return (
      <Box
        as="ul"
        sx={{
          listStyleType: "none",
          p: 0,
        }}
      >
        {data.map((datum, index) => {
          return (
            <Box key={index} as="li" mb={2}>
              {datum.title}
            </Box>
          );
        })}
      </Box>
    );
  };

  const paginationNode = () => {
    // The logic for generating pagination is taken from
    // https://gist.github.com/kottenator/9d936eb3e4e3c3e02598

    const pageBuffer = 3;
    const startPage = currentPage - pageBuffer;
    const endPage = currentPage + pageBuffer + 1;
    const range = [];
    const rangeWithDots = [];
    let l;

    for (let i = 1; i <= totalPages; i++) {
      if (i == 1 || i == totalPages || (i >= startPage && i < endPage)) {
        range.push(i);
      }
    }

    for (let i of range) {
      if (l) {
        if (i - l === pageBuffer) {
          rangeWithDots.push(l + 1);
        } else if (i - l !== 1) {
          rangeWithDots.push("...");
        }
      }
      rangeWithDots.push(i);

      l = i;
    }

    return (
      <Flex as="ul" sx={{ listStyleType: "none", p: 0, flexWrap: "wrap" }}>
        {rangeWithDots.map((pageNumber, index) => {
          return (
            <Box key={index} as="li" mr={2}>
              <Button
                onClick={() => handlePageChange(pageNumber)}
                disabled={pageNumber === "..."}
              >
                {pageNumber}
              </Button>
            </Box>
          );
        })}
      </Flex>
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          m: 20,
        }}
      >
        {listNode()}
        {paginationNode()}
      </Box>
    </ThemeProvider>
  );
};

ReactDOM.render(
  <ReactPaginationComponent primary="green" />,
  document.getElementById("app")
);
