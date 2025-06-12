"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import Image from "next/image";
import { Navigation, Pagination } from "swiper/modules";
import { useEffect, useState } from "react";
import Configuration from "@/configuration";

export default function Blogs() {
  const [bundles, setBundles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const api = Configuration.BACK_BASEURL;

  useEffect(() => {
    const fetchBundles = async () => {
      try {
        const response = await fetch(`${api}productBundles`); // Your API endpoint
        if (!response.ok) {
          throw new Error('Failed to fetch bundles');
        }
        const data = await response.json();
        setBundles(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBundles();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <section className="flat-spacing-14">
      <div className="container">
        <div className="flat-title wow fadeInUp" data-wow-delay="0s">
          <span className="title">Nos packs</span>
        </div>
        <div className="hover-sw-nav view-default hover-sw-3">
          <Swiper
            dir="ltr"
            className="swiper tf-sw-product-sell"
            slidesPerView={3}
            spaceBetween={30}
            breakpoints={{
              640: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              0: { slidesPerView: 1 },
            }}
            modules={[Navigation, Pagination]}
            navigation={{
              prevEl: ".snbp157",
              nextEl: ".snbn157",
            }}
            pagination={{ clickable: true, el: ".spd157" }}
          >
            {bundles.map((bundle, index) => (
              <SwiperSlide key={bundle.id}>
                <div
                  className="blog-article-item wow fadeInUp"
                  data-wow-delay={`${0.1 * index}s`} // Dynamic delay based on index
                >
                  <div className="article-thumb h-460 rounded-0">
                    <Link href={`#`}>
                      <Image
                        className="lazyload"
                        data-src={bundle.img}
                        alt={bundle.name}
                        src={bundle.img}
                        width={460}
                        height={460}
                      />
                    </Link>
                    <div className="article-label">
                      <Link
                        href={`#`}
                        className="tf-btn btn-sm animate-hover-btn"
                      >
                        {/* Prix {bundle.discount} TND */}
                        {bundle.name}
                      </Link>
                    </div>
                  </div>
                  <div className="article-content">
                    {/* <div className="article-title">
                      <Link href={`#`}>
                        {bundle.name}
                      </Link>
                    </div> */}
                    <div className="article-meta">
                      <span>Inclut {bundle.products.length} produits</span>
                      <br></br>
                      <span>Expire : {new Date(bundle.expiresAt).toLocaleDateString()}</span>
                    </div>
                    <div className="article-btn">
                      <Link
                        href={`#`}
                        className="tf-btn btn-line fw-6"
                      >
                        Voir les détails
                        <i className="icon icon-arrow1-top-left" />
                      </Link>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="nav-sw nav-next-slider nav-next-product box-icon w_46 round snbp157">
            <span className="icon icon-arrow-left" />
          </div>
          <div className="nav-sw nav-prev-slider nav-prev-product box-icon w_46 round snbn157">
            <span className="icon icon-arrow-right" />
          </div>
          <div className="sw-dots style-2 sw-pagination-product justify-content-center spd157" />
        </div>
      </div>
    </section>
  );
}