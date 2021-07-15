import React, { FC, useEffect, useState } from "react";
import ReactPaginationComponent from "./component";

const App: FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<any[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `https://hn.algolia.com/api/v1/search?query=javascript&hitsPerPage=5&page=${currentPage}`
      );
      const data = await response.json();

      setData(data.hits);
      setTotalPages(data.nbPages);
      setIsLoading(false);
    };

    fetchData();
  }, [currentPage]);

  const handleChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const listNode = () => {
    return (
      <ul>
        {data.map((datum, index) => {
          return <li key={index}>{datum.title}</li>;
        })}
      </ul>
    );
  };

  const paginationNode = () => {
    if (isLoading) {
      return false;
    }

    return (
      <div className="pagination-component">
        <ReactPaginationComponent
          color="#333"
          isLoading={isLoading}
          onChange={handleChange}
          currentPage={currentPage}
          totalPages={totalPages}
        />
      </div>
    );
  };

  return (
    <div className="container">
      {listNode()}
      {paginationNode()}
    </div>
  );
};

export default App;
