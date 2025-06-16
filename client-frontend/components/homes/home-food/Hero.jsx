"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Configuration from "@/configuration";

export default function Hero() {
  const [sliderData, setSliderData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const api = Configuration.BACK_BASEURL;

  useEffect(() => {
    const fetchSliderData = async () => {
      try {
        const response = await fetch(`${api}hero-banner`);
        if (!response.ok) {
          throw new Error('Failed to fetch slider data');
        }
        const data = await response.json();
        setSliderData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSliderData();
  }, []);

  if (loading) {
    return <div className="tf-slideshow">Loading slider...</div>;
  }

  if (error) {
    return <div className="tf-slideshow">Error: {error}</div>;
  }

  if (!sliderData.length) {
    return <div className="tf-slideshow">No slider data available</div>;
  }

  return (
    <section className="tf-slideshow slider-effect-fade position-relative">
      <Swiper
        modules={[Autoplay, Pagination]}
        pagination={{ clickable: true, el: ".spdhhf" }}
        autoplay={{ delay: 3500 }}
        speed={1000}
        loop={true}
        spaceBetween={0}
        slidesPerView={1}
      >
        {sliderData.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="wrap-slider">
              <Image
                className="lazyload"
                data-src={slide.img}
                alt={slide.name}
                src={slide.img}
                width={2000}
                height={838}
                priority={index === 0} // Add priority to first image for better LCP
              />
              <div className="box-content">
                <div className="container">
                  <h1
                    className="fade-item fade-item-1 text-white heading"
                    dangerouslySetInnerHTML={{ __html: slide.name }}
                  ></h1>
                  <p className="fade-item fade-item-2 text-white">
                    {slide.description}
                  </p>
                  <Link
                    href={`/promotions`}
                    className="fade-item fade-item-3 tf-btn btn-light-icon animate-hover-btn btn-xl rounded-0"
                  >
                    <span>Collection de la boutique</span>
                    <i className="icon icon-arrow-right" />
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="wrap-pagination">
        <div className="container">
          <div className="sw-dots style-2 dots-white sw-pagination-slider justify-content-center spdhhf" />
        </div>
      </div>
    </section>
  );
}