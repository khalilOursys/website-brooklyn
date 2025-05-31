"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Configuration from "@/configuration";

export default function SearchModal() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const api = Configuration.BACK_BASEURL;

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchTerm.trim().length > 1) {
        fetchResults(searchTerm);
      } else {
        setResults([]);
      }
    }, 500); // debounce

    return () => clearTimeout(delayDebounce);
  }, [searchTerm]);

  const fetchResults = async (term) => {
    setLoading(true);
    try {
      const res = await fetch(`${api}product-search?searchTerm=${encodeURIComponent(term)}`);
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setResults(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
    setLoading(false);
  };

  return (
    <div className="offcanvas offcanvas-end canvas-search" id="canvasSearch">
      <div className="canvas-wrapper">
        <header className="tf-search-head">
          <div className="title fw-5">
            Search our site
            <div className="close">
              <span
                className="icon-close icon-close-popup"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              />
            </div>
          </div>
          <div className="tf-search-sticky">
            <form onSubmit={(e) => e.preventDefault()} className="tf-mini-search-frm">
              <fieldset className="text">
                <input
                  type="text"
                  placeholder="Search"
                  name="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  required
                />
              </fieldset>
              <button type="submit">
                <i className="icon-search" />
              </button>
            </form>
          </div>
        </header>

        <div className="canvas-body p-0">
          <div className="tf-search-content">
            {loading && <div className="p-3">Loading...</div>}

            {!loading && results.length > 0 && (
              <div className="tf-search-hidden-inner">
                {results.map((product) => (
                  <div className="tf-loop-item" key={product.id}>
                    <div className="image">
                      <Link href={`/product-detail/${product.id}`}>
                        <Image
                          alt={product.name}
                          src={product.images[0].url || "/placeholder.jpg"} // fallback if no image
                          width={100}
                          height={100}
                        />
                      </Link>
                    </div>
                    <div className="content">
                      <Link href={`/product-detail/${product.id}`}>
                        {product.name}
                      </Link>
                      <div className="tf-product-info-price">
                        <div className="price fw-6">{product.price?.toFixed(3)} TND</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {!loading && searchTerm.length > 1 && results.length === 0 && (
              <div className="p-3">No results found.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
