"use client";

import { useContextElement } from "@/context/Context";
import Image from "next/image";
import Link from "next/link";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useEffect, useState } from "react";
import Configuration from "@/configuration";

export default function ShopGram() {
  const { setQuickAddItem, setIsPacks } = useContextElement();
  const [bundles, setBundles] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const api = Configuration.BACK_BASEURL;

  useEffect(() => {
    const fetchBundles = async () => {
      try {
        const response = await fetch(`${api}productBundles`);
        if (!response.ok) {
          throw new Error('Failed to fetch bundles');
        }
        const data = await response.json();

        const transformedData = data.map(item => ({
          id: item.id,
          name: item.name,
          description: item.description || '',
          price: item.discount?.toString() || '0.00',
          createdAt: item.createdAt || new Date().toISOString(),
          expiresAt: item.expiresAt || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
          images: [{
            id: `generated-${Math.random().toString(36).substring(2, 9)}`,
            productId: item.id,
            url: item.img || '/default-product-image.jpg',
            isPrimary: true
          }],
          quantity: item.quantity || 1,
          isPacks: 1,
          quickAdd: true // Added quickAdd flag for consistency
        }));

        setBundles(transformedData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBundles();
  }, [api]);

  if (loading) {
    return <div className="text-center py-8">Loading bundles...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">Error: {error}</div>;
  }

  return (
    <section className="flat-spacing-7">
      <div className="container">
        <div className="flat-title wow fadeInUp" data-wow-delay="0s">
          <span className="title">Shop Gram</span>
          <p className="sub-title">
            Inspire and let yourself be inspired, from one unique fashion to
            another.
          </p>
        </div>
        <div className="wrap-carousel wrap-shop-gram">
          <Swiper
            dir="ltr"
            className="tf-sw-shop-gallery"
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
              prevEl: ".promo1",
              nextEl: ".promo2",
            }}
            pagination={{
              el: ".spdsg1",
            }}
          >
            {bundles.map((item, index) => (
              <SwiperSlide key={item.id || index}>
                <div
                  className="gallery-item hover-img wow fadeInUp"
                  data-wow-delay={item.wowDelay || "0s"}
                >
                  <div className="img-style">
                    <Image
                      className="lazyload img-hover"
                      src={item.images[0].url}
                      alt={item.name}
                      width={400}
                      height={400}
                      priority={index < 3} // Only prioritize first few images
                    />
                  </div>

                  <Link
                    href={`pack-detail/${item.id}`}
                    className="box-icon"
                  >
                    <span className="icon icon-bag" />
                    <span className="tooltip">View product</span>
                  </Link>
                  {/* {item.quickAdd ? (
                    <a
                      href="#quick_add"
                      onClick={() => {
                        setQuickAddItem(item);
                        setIsPacks(item.isPacks);
                      }}
                      data-bs-toggle="modal"
                      className="box-icon"
                    >
                      <span className="icon icon-bag" />
                      <span className="tooltip">Quick Add</span>
                    </a>
                  ) : (
                    <Link
                      href={`pack-detail/${item.id}`}
                      className="box-icon"
                    >
                      <span className="icon icon-bag" />
                      <span className="tooltip">View product</span>
                    </Link>
                  )} */}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="nav-sw disable-line nav-next-slider nav-next-sell-1 box-icon w_46 round promo1">
            <span className="icon icon-arrow-left" />
          </div>
          <div className="nav-sw disable-line nav-prev-slider nav-prev-sell-1 box-icon w_46 round promo2">
            <span className="icon icon-arrow-right" />
          </div>
        </div>
      </div>
    </section>
  );
}