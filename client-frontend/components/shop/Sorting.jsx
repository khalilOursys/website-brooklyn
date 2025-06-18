"use client";
import { products1 } from "@/data/products";
import { sortingOptions } from "@/data/shop";
import React, { useEffect, useState } from "react";

export default function Sorting({ products = products1, setFinalSorted }) {
  const [selectedOptions, setSelectedOptions] = useState(sortingOptions[0]);

  useEffect(() => {
    const sortedProducts = [...products];
    if (selectedOptions.text == "Default") {
      setFinalSorted([...products]);
    } else if (selectedOptions.text == "Alphabetically, A-Z") {
      setFinalSorted(
        [...products].sort((a, b) => a.name.localeCompare(b.name))
      );
    } else if (selectedOptions.text == "Alphabetically, Z-A") {
      setFinalSorted(
        [...products].sort((a, b) => b.name.localeCompare(a.name))
      );
    } else if (selectedOptions.text == "Price, low to high") {
      /* setFinalSorted([...products].sort((a, b) => a.price - b.price)); */
      sortedProducts.sort((a, b) => {
        // Calculate discount percentages if not stored directly
        const priceA = a.discount === 0 ? a.price : a.discount;
        const priceB = b.discount === 0 ? b.price : b.discount;
        return priceA - priceB; // Sort high to low discount
      });
      setFinalSorted(sortedProducts);
    } else if (selectedOptions.text == "Price, high to low") {
      /* setFinalSorted([...products].sort((a, b) => b.price - a.price)); */

      sortedProducts.sort((a, b) => {
        // Calculate discount percentages if not stored directly
        const priceA = a.discount === 0 ? a.price : a.discount;
        const priceB = b.discount === 0 ? b.price : b.discount;
        return priceB - priceA; // Sort high to low discount
      });
      setFinalSorted(sortedProducts);
    }
  }, [products, selectedOptions]);

  return (
    <>
      {" "}
      <div className="btn-select">
        <span className="text-sort-value">{selectedOptions.text}</span>
        <span className="icon icon-arrow-down" />
      </div>
      <div className="dropdown-menu">
        {sortingOptions.map((item, index) => (
          <div
            key={index}
            onClick={() => setSelectedOptions(item)}
            className={`select-item ${item == selectedOptions ? "active" : ""}`}
          >
            <span className="text-value-item">{item.text}</span>
          </div>
        ))}
      </div>
    </>
  );
}
