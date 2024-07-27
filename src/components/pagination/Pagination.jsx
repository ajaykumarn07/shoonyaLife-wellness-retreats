import React from "react";
import "./Pagination.css";

const Pagination = ({
  currentPage,
  totalRetreats,
  retreatsPerPage,
  handlePageChange,
}) => {
  const totalPages = Math.ceil(totalRetreats / retreatsPerPage);

  return (
    <div className="pagination">
      <button onClick={() => handlePageChange(-1)} disabled={currentPage === 1}>
        Previous
      </button>
      <button
        onClick={() => handlePageChange(1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
