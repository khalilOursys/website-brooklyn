"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Navigation, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Default images array (same as in first file)
const imagesDefault = [
  {
    id: 1,
    src: "/images/shop/products/p-d1.png",
    alt: "",
    width: 770,
    height: 1075,
    dataValue: "beige",
  },
  {
    id: 2,
    src: "/images/shop/products/hmgoepprod.jpg",
    alt: "",
    width: 713,
    height: 1070,
    dataValue: "beige",
  },
  {
    id: 3,
    src: "/images/shop/products/hmgoepprod2.jpg",
    alt: "img-compare",
    width: 713,
    height: 1070,
    dataValue: "beige",
  },
  {
    id: 4,
    src: "/images/shop/products/hmgoepprod3.jpg",
    alt: "img-compare",
    width: 713,
    height: 1070,
    dataValue: "beige",
  },
  {
    id: 5,
    src: "/images/shop/products/hmgoepprod4.jpg",
    alt: "img-compare",
    width: 768,
    height: 1152,
    dataValue: "beige",
  },
  {
    id: 6,
    src: "/images/shop/products/hmgoepprod5.jpg",
    alt: "img-compare",
    width: 713,
    height: 1070,
    dataValue: "beige",
  },
  {
    id: 7,
    src: "/images/shop/products/hmgoepprod6.jpg",
    alt: "",
    width: 768,
    height: 1152,
    dataValue: "black",
  },
  {
    id: 8,
    src: "/images/shop/products/hmgoepprod7.jpg",
    alt: "",
    width: 713,
    height: 1070,
    dataValue: "black",
  },
  {
    id: 9,
    src: "/images/shop/products/hmgoepprod8.jpg",
    alt: "",
    width: 713,
    height: 1070,
    dataValue: "black",
  },
  {
    id: 10,
    src: "/images/shop/products/hmgoepprod9.jpg",
    alt: "",
    width: 768,
    height: 1152,
    dataValue: "black",
  },
  {
    id: 11,
    src: "/images/shop/products/hmgoepprod10.jpg",
    alt: "",
    width: 713,
    height: 1070,
    dataValue: "blue",
  },
  {
    id: 12,
    src: "/images/shop/products/hmgoepprod11.jpg",
    alt: "",
    width: 713,
    height: 1070,
    dataValue: "blue",
  },
  {
    id: 13,
    src: "/images/shop/products/hmgoepprod12.jpg",
    alt: "",
    width: 768,
    height: 1152,
    dataValue: "blue",
  },
  {
    id: 14,
    src: "/images/shop/products/hmgoepprod13.jpg",
    alt: "",
    width: 768,
    height: 1152,
    dataValue: "blue",
  },
  {
    id: 15,
    src: "/images/shop/products/hmgoepprod14.jpg",
    alt: "",
    width: 768,
    height: 1152,
    dataValue: "white",
  },
  {
    id: 16,
    src: "/images/shop/products/hmgoepprod15.jpg",
    alt: "",
    width: 768,
    height: 1152,
    dataValue: "white",
  },
  {
    id: 17,
    src: "/images/shop/products/hmgoepprod16.jpg",
    alt: "",
    width: 768,
    height: 1152,
    dataValue: "white",
  },
  {
    id: 18,
    src: "/images/shop/products/hmgoepprod17.jpg",
    alt: "",
    width: 768,
    height: 1152,
    dataValue: "white",
  },
];

export default function Slider1({
  currentColor = "Beige",
  handleColor = () => { },
  images = imagesDefault,
}) {
  const [updatedImages, setUpdatedImages] = useState([{
    id: 1,
    src: images[0]?.url || images[0]?.src || "/images/shop/products/p-d1.png",
    alt: "",
    width: 768,
    height: 1152,
    dataValue: "white",
  }]);

  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const swiperRef = useRef(null);

  // Transform images data similar to first file
  useEffect(() => {
    if (images.length > 0) {
      const newImages = images.map((image, index) => ({
        id: index + 1, // Generate unique IDs
        src: image.url || image.src || "", // Support both url and src properties
        alt: image.alt || image.id || "",
        width: image.width || 768, // Default width if not provided
        height: image.height || 1152, // Default height if not provided
        dataValue: image.dataValue || "default", // Default dataValue if not provided
      }));

      setUpdatedImages(newImages);
    }
  }, [images]);

  // Handle slide change when color changes
  useEffect(() => {
    if (updatedImages.length > 0 && swiperRef.current) {
      const slideIndex = updatedImages.findIndex(
        (elm) => elm.dataValue?.toLowerCase() === currentColor.toLowerCase()
      );
      if (slideIndex !== -1) {
        swiperRef.current.slideTo(slideIndex);
      }
    }
  }, [currentColor, updatedImages]);

  // Handle slide change event
  const handleSlideChange = (swiper) => {
    if (updatedImages[swiper.activeIndex]) {
      handleColor(updatedImages[swiper.activeIndex].dataValue);
    }
  };

  return (
    <>
      <Swiper
        dir="ltr"
        direction="vertical"
        spaceBetween={10}
        slidesPerView={6}
        className="tf-product-media-thumbs other-image-zoom"
        onSwiper={setThumbsSwiper}
        modules={[Thumbs]}
        breakpoints={{
          0: {
            direction: "horizontal",
          },
          1150: {
            direction: "vertical",
          },
        }}
      >
        {updatedImages.map((slide, index) => (
          <SwiperSlide key={index} className="stagger-item">
            <div className="item">
              <Image
                className="lazyload"
                data-src={slide.src}
                alt={slide.alt}
                src={slide.src}
                width={slide.width}
                height={slide.height}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <Swiper
        dir="ltr"
        spaceBetween={10}
        slidesPerView={1}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        className="tf-product-media-main"
        id="gallery-swiper-started"
        thumbs={{ swiper: thumbsSwiper }}
        modules={[Thumbs, Navigation]}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        onSlideChange={handleSlideChange}
      >
        {updatedImages.map((slide, index) => (
          <SwiperSlide key={index}>
            <a
              className="item"
              data-pswp-width={slide.width}
              data-pswp-height={slide.height}
            >
              <Image
                className="tf-image-zoom lazyload"
                data-zoom={slide.src}
                data-src={slide.src}
                alt={slide.alt}
                src={slide.src}
                width={slide.width}
                height={slide.height}
              />
            </a>
          </SwiperSlide>
        ))}

        {/* Navigation buttons */}
        <div className="swiper-button-next button-style-arrow thumbs-next"></div>
        <div className="swiper-button-prev button-style-arrow thumbs-prev"></div>
      </Swiper>
    </>
  );
}