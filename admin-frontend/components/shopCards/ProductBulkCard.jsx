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

      </div>
      <div className="card-product-info">
        <Link href={`/product-bulk-detail/${product.id}`} className="title link">
          {product.name}
        </Link>
        <span className="price">{product.bulkPrice.toFixed(3)} TND</span>
      </div>
    </div>
  );
};
