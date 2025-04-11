"use client";
import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import { layouts, sortingOptions } from "@/data/shop";
import ProductGrid from "./ProductGrid";
import Pagination from "../common/Pagination";
import Sorting from "./Sorting";
import { products68 } from "@/data/products"; // ✅ Import all products

export default function ShopSidebarleft({ slug }) {
  const [gridItems, setGridItems] = useState(3);
  const [data, setData] = useState(["khalil"]);
  const [selectedTexts, setSelectedTexts] = useState([]);

  const [finalSorted, setFinalSorted] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]); // ✅ Store filtered products

  // ✅ Filter products based on slug
  useEffect(() => {
    if (slug) {
      const filtered = products68.filter((product) =>
        product.categorie.toLowerCase() === slug.toLowerCase()
      );
      setFilteredProducts(filtered);
      setFinalSorted(filtered); // ✅ Also update sorted products initially
    }
  }, [slug]); // ✅ Re-run when slug changes
  useEffect(() => {
    console.log("eeee", selectedTexts);

  }, [selectedTexts]); // ✅ Re-run when slug changes

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
                {/* ✅ Sorting should now use filteredProducts */}
                <Sorting setFinalSorted={setFinalSorted} products={filteredProducts} />
              </div>
            </div>
          </div>
          <div className="tf-row-flex">
            <Sidebar selectedTexts={selectedTexts} setSelectedTexts={setSelectedTexts} />
            <div className="tf-shop-content">
              {/* ✅ Pass filtered products to ProductGrid */}
              <ProductGrid allproducts={finalSorted} gridItems={gridItems} />
              {/* pagination */}
              {finalSorted.length ? (
                <ul className="tf-pagination-wrap tf-pagination-list">
                  <Pagination data={data} setData={setData} />
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
