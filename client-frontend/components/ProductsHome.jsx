"use client";

import React, { useEffect, useState } from "react";
import Shopcard28 from "@/components/shopCards/ProductCard28";
import ProductCard33 from "./shopCards/ProductCard33";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import Configuration from "@/configuration";

export default function ProductsHome() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [discountedProducts, setDiscountedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const api = Configuration.BACK_BASEURL;

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    async function fetchProducts() {
      try {
        const response = await fetch(`${api}products/findByDiscountAndFeatured`,
          {
            signal: controller.signal,
            cache: 'no-store' // Disable caching
          }
        );

        if (!isMounted) return;

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        if (isMounted) {
          setFeaturedProducts(data.featuredProducts);
          setDiscountedProducts(data.discountedProducts);
          /* setError(null); */
        }
      } catch (error) {
        if (isMounted && error.name !== 'AbortError') {
          console.error("Error fetching products:", error);
          /* setError("Failed to load products. Please try again."); */
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchProducts();

    return () => {
      isMounted = false;
      controller.abort(); // Cancel the request if component unmounts
    };
  }, []);

  return (
    <>
      {/* Special Offers Section */}
      <section className="flat-spacing-15">
        <div className="container">
          <div className="flat-title">
            <span className="title fw-6 wow fadeInUp font-readex-pro text_black-3">
              Special Offers
            </span>
          </div>
          <div className="wrap-carousel">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <Swiper
                dir="ltr"
                className="swiper tf-sw-product-sell wrap-sw-over"
                breakpoints={{
                  1024: { spaceBetween: 30, slidesPerView: 4 },
                  768: { spaceBetween: 30, slidesPerView: 3 },
                  0: { spaceBetween: 15, slidesPerView: 2 },
                }}
                modules={[Pagination, Navigation]}
                pagination={{ clickable: true, el: ".spdp2" }}
                navigation={{ prevEl: ".pnbpp21", nextEl: ".pnbpn21" }}
              >
                {discountedProducts.map((product, i) => (
                  <SwiperSlide key={i}>
                    <Shopcard28 product={product} />
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
            <div className="sw-dots style-2 sw-pagination-sell-1 justify-content-center spdp2" />
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="flat-spacing-15 bg_light-blue-3">
        <div className="container">
          <div className="flat-title">
            <span className="title fw-6 wow fadeInUp font-readex-pro text_black-3">
              Our Top Picks
            </span>
          </div>
          <div className="wrap-carousel">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <Swiper
                dir="ltr"
                className="swiper tf-sw-product-sell wrap-sw-over"
                breakpoints={{
                  1024: { spaceBetween: 30, slidesPerView: 4 },
                  768: { spaceBetween: 30, slidesPerView: 3 },
                  0: { spaceBetween: 15, slidesPerView: 2 },
                }}
                modules={[Pagination]}
                pagination={{ clickable: true, el: ".spdp1" }}
              >
                {featuredProducts.map((product, i) => (
                  <SwiperSlide key={i}>
                    <ProductCard33 product={product} />
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
            <div className="sw-dots style-2 sw-pagination-sell justify-content-center spdp1" />
          </div>
        </div>
      </section>
    </>
  );
}
