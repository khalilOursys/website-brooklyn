"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Configuration from "@/configuration";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const api = Configuration.BACK_BASEURL;

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${api}categories/getAllParent`); // Your API endpoint
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        const data = await response.json();
        setCategories(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchCategories();
  }, []);

  /* useEffect(() => {
    fetch('http://localhost:3001/api/categories')
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(err => console.error('Error fetching categories:', err));
  }, []); */

  return (
    <section>
      <div className="flat-title">
        <span className="title wow fadeInUp" data-wow-delay="0s">
          Acheter par catégorie
        </span>
      </div>
      <div className="flat-categories-bg wrap-carousel">
        <Swiper
          dir="ltr"
          spaceBetween={15}
          slidesPerView={6}
          breakpoints={{
            1024: { slidesPerView: 6, spaceBetween: 70 },
            768: { slidesPerView: 4, spaceBetween: 30 },
            480: { slidesPerView: 3, spaceBetween: 15 },
            0: { slidesPerView: 2, spaceBetween: 15 },
          }}
          modules={[Navigation]}
          navigation={{
            prevEl: ".scnbp1",
            nextEl: ".scnbn1",
          }}
          className="swiper tf-sw-recent wow fadeInUp"
        >
          {categories.map((category) => (
            <SwiperSlide key={category.id}>
              <div className="collection-item-circle hover-img">
                <Link
                  href={`/categories/${category.slug}`}
                  className="collection-image img-style"
                >
                  <Image
                    width={149}
                    height={149}
                    className="lazyloaded"
                    alt={category.name}
                    src={category.iconUrl || "/images/image-not-found.jpg"}
                  />
                </Link>
                <div className="collection-content text-center">
                  <Link
                    href={`/categories/${category.slug}`}
                    className="link title fw-5 text-line-clamp-1"
                  >
                    {category.name}
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="nav-sw nav-next-slider nav-next-recent box-icon w_46 round scnbn1">
          <span className="icon icon-arrow-left" />
        </div>
        <div className="nav-sw nav-prev-slider nav-prev-recent box-icon w_46 round scnbp1">
          <span className="icon icon-arrow-right" />
        </div>
      </div>
    </section>
  );
}