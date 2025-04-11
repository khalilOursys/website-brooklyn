"use client";
import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import { layouts, sortingOptions } from "@/data/shop";
import ProductGrid from "./ProductGrid";
import Pagination from "../common/Pagination";
import Sorting from "./Sorting";

export default function ShopSidebarleft({ slug }) {
  const [gridItems, setGridItems] = useState(3);
  const [data, setData] = useState(["khalil"]);
  const [selectedBrand, setSelectedBrand] = useState([]);
  const [selectedAvailabilities, setSelectedAvailabilities] = useState([]);
  const [finalSorted, setFinalSorted] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [minPrice, setMinPrice] = useState(0); // Add state for minPrice
  const [maxPrice, setMaxPrice] = useState(10000); // Add state for maxPrice
  const [currentPage, setCurrentPage] = useState(0); // Add state for current page
  const [itemsPerPage, setItemsPerPage] = useState(10); // Add state for items per page

  // Function to fetch products from the API
  const fetchProducts = async (categorySlug, brandName, minPrice, maxPrice, page, limit) => {
    try {
      const url = new URL("http://localhost:3001/products/search");
      url.searchParams.append("categorySlug", categorySlug);
      if (brandName) url.searchParams.append("brandName", brandName);
      if (minPrice) url.searchParams.append("minPrice", minPrice);
      if (maxPrice) url.searchParams.append("maxPrice", maxPrice);
      url.searchParams.append("page", page); // Add page parameter
      url.searchParams.append("limit", limit); // Add limit parameter

      const response = await fetch(url.toString());
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await response.json();
      setFilteredProducts(data.products);
      setFinalSorted(data.products); // Update sorted products initially
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Fetch products when slug, selectedBrand, price range, or pagination changes
  useEffect(() => {
    if (slug) {
      const brandName = selectedBrand.length > 0 ? selectedBrand[0].name : undefined;
      fetchProducts(slug, brandName, minPrice, maxPrice, currentPage, itemsPerPage);
    }
  }, [slug, selectedBrand, minPrice, maxPrice, currentPage, itemsPerPage]);

  // Log selectedBrand and selectedAvailabilities for debugging
  /* useEffect(() => {
    console.log("selectedBrand", selectedBrand);
    console.log("selectedAvailabilities", selectedAvailabilities);
  }, [selectedBrand, selectedAvailabilities]); */

  // Handle page change for pagination
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <section className="flat-spacing-1">
        <div className="container">
          <div className="tf-shop-control grid-3 align-items-center">
            <div className="tf-control-filter"></div>
            <ul className="tf-control-layout d-flex justify-content-center">
              {layouts.slice(0, 4).map((layout, index) => (
                <li
                  key={index}
                  className={`tf-view-layout-switch ${layout.className} ${gridItems == layout.dataValueGrid ? "active" : ""
                    }`}
                  onClick={() => setGridItems(layout.dataValueGrid)}
                >
                  <div className="item">
                    <span className={`icon ${layout.iconClass}`} />
                  </div>
                </li>
              ))}
            </ul>
            <div className="tf-control-sorting d-flex justify-content-end">
              <div className="tf-dropdown-sort" data-bs-toggle="dropdown">
                {console.log(filteredProducts)}
                <Sorting setFinalSorted={setFinalSorted} products={filteredProducts} />
              </div>
            </div>
          </div>
          <div className="tf-row-flex">
            <Sidebar
              selectedBrand={selectedBrand}
              setSelectedBrand={setSelectedBrand}
              selectedAvailabilities={selectedAvailabilities}
              setSelectedAvailabilities={setSelectedAvailabilities}
              minPrice={minPrice}
              setMinPrice={setMinPrice}
              maxPrice={maxPrice}
              setMaxPrice={setMaxPrice}
            />
            {console.log(finalSorted)}
            <div className="tf-shop-content">
              <ProductGrid allproducts={finalSorted} gridItems={gridItems} />
              {finalSorted.length ? (
                <ul className="tf-pagination-wrap tf-pagination-list">
                  {/* <Pagination
                    currentPage={currentPage}
                    itemsPerPage={itemsPerPage}
                    totalItems={filteredProducts.length} // Replace with total count from API if available
                    onPageChange={handlePageChange}
                  /> */}
                </ul>
              ) : (
                <p className="text-center">No products found for "{slug}".</p>
              )}
            </div>
          </div>
        </div>
      </section>
      <div className="btn-sidebar-style2">
        <button
          data-bs-toggle="offcanvas"
          data-bs-target="#sidebarmobile"
          aria-controls="offcanvas"
        >
          <i className="icon icon-sidebar-2" />
        </button>
      </div>
    </>
  );
}