"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { ProductCard } from "../shopCards/ProductCard";
import { Navigation, Pagination } from "swiper/modules";
import { VariantCard } from "../shopCards/VariantCard";

export default function Products({ variants, product }) {
  // Create a unified array with the main product first, then variants
  const allProducts = [
    {
      ...product,
      isDefault: true, // Mark as default product
    },
    ...variants.map(variant => ({
      ...variant,
      isDefault: false, // Mark as variant
      // Merge product-level data that variants might need
      category: product.category,
      brand: product.brand,
      description: product.description,
      isFeatured: product.isFeatured,
      // Add any other product-level fields you want variants to inherit
    }))
  ];

  return (
    <section className="flat-spacing-1 pt_0">
      <div className="container">
        <div className="flat-title">
          <span className="title">Variantes produit</span>
        </div>
        <div className="hover-sw-nav hover-sw-2">
          <Swiper
            dir="ltr"
            className="swiper tf-sw-product-sell wrap-sw-over"
            slidesPerView={4}
            spaceBetween={30}
            breakpoints={{
              1024: { slidesPerView: 4 },
              640: { slidesPerView: 3 },
              0: { slidesPerView: 2, spaceBetween: 15 },
            }}
            modules={[Navigation, Pagination]}
            navigation={{
              prevEl: ".snbp3070",
              nextEl: ".snbn3070",
            }}
            pagination={{ clickable: true, el: ".spd307" }}
          >
            {allProducts.map((item, i) => (
              <SwiperSlide key={i} className="swiper-slide">
                <VariantCard product={item} />
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="nav-sw nav-next-slider nav-next-product box-icon w_46 round snbp3070">
            <span className="icon icon-arrow-left" />
          </div>
          <div className="nav-sw nav-prev-slider nav-prev-product box-icon w_46 round snbn3070">
            <span className="icon icon-arrow-right" />
          </div>
          <div className="sw-dots style-2 sw-pagination-product justify-content-center spd307" />
        </div>
      </div>
    </section>
  );
}