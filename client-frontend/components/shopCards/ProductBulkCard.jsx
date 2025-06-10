"use client";
import Image from "next/image";
import Link from "next/link";
export const ProductBulkCard = ({ product }) => {

  return (
    <div className="card-product fl-item" key={product.id}>
      <div className="card-product-wrapper">
        <Link href={`/product-bulk-detail/${product.id}`} className="product-img">
          <Image
            className="lazyload img-product"
            data-src={product.product.images[0].url}
            src={product.product.images[0].url}
            alt="image-product"
            width={720}
            height={1005}
          />
          <Image
            className="lazyload img-hover"
            data-src={
              product.product.images[1] ? product.product.images[1].url : product.product.images[0].url
            }
            src={
              product.product.images[1] ? product.product.images[1].url : product.product.images[0].url
            }
            alt="image-product"
            width={720}
            height={1005}
          />
        </Link>
        {product.discount ? (
          <div className="on-sale-wrap text-end">
            <div className="on-sale-item">
              -
              {Math.round(
                ((product.bulkPrice - product.discount) / product.bulkPrice) * 100
              )}
              %
            </div>
          </div>
        ) : (
          ""
        )}

      </div>
      <div className="card-product-info">
        <Link href={`/product-bulk-detail/${product.id}`} className="title link">
          {product.name}
        </Link>


        {product.discount ? (
          <span className="price">
            <span className="fw-4 text-sale">
              {product.discount.toFixed(3)} TND
            </span>{" "}
            <span className="text_primary">{product.bulkPrice.toFixed(3)} TND</span>
          </span>
        ) : (
          <span className="price">{product.bulkPrice.toFixed(3)} TND</span>
        )}
        {/* <span className="price">{product.bulkPrice.toFixed(3)} TND</span> */}
      </div>
    </div>
  );
};
