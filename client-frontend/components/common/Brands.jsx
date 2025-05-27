"use client";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import { Navigation, Pagination } from "swiper/modules";
import Configuration from "@/configuration";

export default function Brands({ parentClass = "flat-spacing-1" }) {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const api = Configuration.BACK_BASEURL;

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await fetch(`${api}brands`); // Your API endpoint
        if (!response.ok) {
          throw new Error('Failed to fetch brands');
        }
        const data = await response.json();
        setBrands(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBrands();
  }, []);

  if (loading) {
    return <div className={parentClass}>Loading brands...</div>;
  }

  if (error) {
    return <div className={parentClass}>Error: {error}</div>;
  }

  if (!brands.length) {
    return <div className={parentClass}>No brands available</div>;
  }

  return (
    <section className={parentClass}>
      <div className="container">
        <div className="wrap-carousel wrap-shop-gram">
          <div className="flat-title">
            <span className="title fw-6 wow fadeInUp font-readex-pro text_black-3">
              Our brands
            </span>
          </div>
          <Swiper
            dir="ltr"
            className="swiper tf-sw-brand"
            loop={false}
            autoplay={false}
            spaceBetween={7}
            slidesPerView={5}
            breakpoints={{
              1000: { slidesPerView: 5 },
              768: { slidesPerView: 3 },
              576: { slidesPerView: 3 },
              0: { slidesPerView: 2 },
            }}
            modules={[Navigation, Pagination]}
            navigation={{
              prevEl: ".brand1",
              nextEl: ".brand2",
            }}
            pagination={{ clickable: true, el: ".sp106" }}
          >
            {brands.map((brand, index) => (
              <SwiperSlide key={index}>
                <div
                  className={`brand-item ${index == brands.length - 1 ? "border-done" : ""
                    }`}
                >
                  <Image
                    className="lazyload"
                    data-src={brand.img}
                    alt={brand.name}
                    src={brand.img}
                    width={398}
                    height={164}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="nav-sw disable-line nav-next-slider nav-next-sell-1 box-icon w_46 round brand1">
            <span className="icon icon-arrow-left" />
          </div>
          <div className="nav-sw disable-line nav-prev-slider nav-prev-sell-1 box-icon w_46 round brand2">
            <span className="icon icon-arrow-right" />
          </div>
          {/* <div className="d-md-none sw-dots style-2 sw-pagination-brand justify-content-center sp106" /> */}
        </div>
      </div>
    </section>
  );
}