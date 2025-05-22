"use client";
import React, { useEffect, useState } from "react";

export default function Pagination({
  currentPage,
  itemsPerPage,
  totalItems,
  onPageChange
}) {
  // Calculate total pages
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Handle page click
  const handlePageClick = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      onPageChange(pageNumber);
    }
  };

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 4; // Adjust as needed
    let startPage, endPage;

    if (totalPages <= maxVisiblePages) {
      startPage = 1;
      endPage = totalPages;
    } else {
      const halfVisible = Math.floor(maxVisiblePages / 2);
      if (currentPage <= halfVisible) {
        startPage = 1;
        endPage = maxVisiblePages;
      } else if (currentPage + halfVisible >= totalPages) {
        startPage = totalPages - maxVisiblePages + 1;
        endPage = totalPages;
      } else {
        startPage = currentPage - halfVisible;
        endPage = currentPage + halfVisible;
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <li key={i} className={currentPage === i ? "active" : ""}>
          <button
            className="pagination-link"
            onClick={() => handlePageClick(i)}
          >
            {i}
          </button>
        </li>
      );
    }

    return pages;
  };

  return (
    <ul className="tf-pagination-wrap tf-pagination-list">
      {/* Previous button */}
      <li>
        <button
          className="pagination-link"
          onClick={() => handlePageClick(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <span className="icon icon-arrow-left" />
        </button>
      </li>

      {/* Page numbers */}
      {getPageNumbers()}

      {/* Next button */}
      <li>
        <button
          className="pagination-link"
          onClick={() => handlePageClick(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <span className="icon icon-arrow-right" />
        </button>
      </li>
    </ul>
  );
}