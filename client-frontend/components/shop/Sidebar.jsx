"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { featuredProducts } from "@/data/products";
import { galleryItems } from "@/data/gallery";
import { categories } from "@/data/categories";
import { socialLinks } from "@/data/socials";
import Slider from "rc-slider";
export default function Sidebar({
  slug,
  categories,
  selectedCategories,
  setSelectedCategories,
  selectedBrand,
  setSelectedBrand,
  selectedAvailabilities,
  setSelectedAvailabilities,
  minPrice,
  maxPrice,
  price,
  setPrice,
  brands
}) {

  const availabilities = [
    { id: 1, isAvailable: true, text: "Available", count: 14 },
    { id: 2, isAvailable: false, text: "Out of Stock", count: 2 },
  ];
  console.log(categories);

  const handleSelectCategories = (category) => {
    setSelectedCategories((prev) => {
      const isSelected = prev.some((el) => el.id === category.id);
      const newSelectedCategories = isSelected
        ? prev.filter((el) => el.id !== category.id) // Remove if already selected
        : [...prev, category]; // Add if not selected
      return newSelectedCategories;
    });
  };

  const handleSelectAvailabilities = (availability) => {
    setSelectedAvailabilities((prev) => {
      const isSelected = prev.some((el) => el.id === availability.id);
      const newSelectedAvailabilities = isSelected
        ? prev.filter((el) => el.id !== availability.id) // Remove if already selected
        : [...prev, availability]; // Add if not selected
      return newSelectedAvailabilities;
    });
  };

  const handleSelectBrands = (brand) => {
    setSelectedBrand((prev) => {
      const isSelected = prev.some((el) => el.id === brand.id);
      const newSelectedBrands = isSelected
        ? prev.filter((el) => el.id !== brand.id) // Remove if already selected
        : [...prev, brand]; // Add if not selected
      return newSelectedBrands;
    });
  };

  const handlePrice = (value) => {
    setPrice(value);
  };

  return (
    <aside className="tf-shop-sidebar wrap-sidebar-mobile">
      <div className="widget-facet wd-categories">
        {/* Categories Section - Only shown if slug is "bulkproduct" */}
        {slug === "bulkproduct" && (
          <form
            onSubmit={(e) => e.preventDefault()}
            action="#"
            id="facet-filter-form2"
            className="facet-filter-form"
          >
            <div className="widget-facet">
              <div
                className="facet-title"
                data-bs-target="#categories"
                data-bs-toggle="collapse"
                aria-expanded="true"
                aria-controls="categories"
              >
                <span>Categories</span>
                <span className="icon icon-arrow-up" />
              </div>
              <div id="categories" className="collapse show">
                <ul className="tf-filter-group current-scrollbar mb_36">
                  {categories.map((category) => (
                    <li
                      key={category.id}
                      className="list-item d-flex gap-12 align-items-center"
                      onClick={() => handleSelectCategories(category)}
                    >
                      <input
                        type="checkbox"
                        className="tf-check"
                        readOnly
                        checked={selectedCategories.some((item) => item.id === category.id)}
                      />
                      <label className="label">
                        <span>{category.name}</span>&nbsp;
                        <span>
                          (
                          {category.count}
                          )
                        </span>
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </form>
        )}

        {/* brand */}
        <form
          onSubmit={(e) => e.preventDefault()}
          action="#"
          id="facet-filter-form1"
          className="facet-filter-form"
        >
          <div className="widget-facet">
            <div
              className="facet-title"
              data-bs-target="#categories"
              data-bs-toggle="collapse"
              aria-expanded="true"
              aria-controls="availability"
            >
              <span>Marques</span>
              <span className="icon icon-arrow-up" />
            </div>
            <div id="categories" className="collapse show">
              <ul className="tf-filter-group current-scrollbar mb_36">
                {brands.map((cat) => (
                  <li
                    key={cat.id}
                    className="list-item d-flex gap-12 align-items-center"
                    onClick={() => handleSelectBrands(cat)}
                  >
                    <input
                      type="radio"
                      className="tf-check"
                      readOnly
                      checked={selectedBrand.some((item) => item.name === cat.name)}
                    />
                    <label className="label">
                      <span>{cat.name}</span>&nbsp;
                      <span>
                        (
                        {cat.count}
                        )
                      </span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </form>

        {/* avaibility */}
        <form
          onSubmit={(e) => e.preventDefault()}
          action="#"
          id="facet-filter-form"
          className="facet-filter-form"
        >
          <div className="widget-facet wrap-price">
            <div
              className="facet-title"
              data-bs-target="#price"
              data-bs-toggle="collapse"
              aria-expanded="true"
              aria-controls="price"
            >
              <span>Prix</span>
              <span className="icon icon-arrow-up" />
            </div>
            <div id="price" className="collapse show">
              <div className="widget-price filter-price">
                <Slider
                  formatLabel={() => ``}
                  range
                  max={maxPrice}
                  min={minPrice}
                  defaultValue={price}
                  onChange={(value) => handlePrice(value)}
                  id="slider"
                />
                <div className="box-title-price">
                  <span className="title-price">Prix :</span>
                  <div className="caption-price">
                    <div>
                      <span className="min-price">{price[0]} TND</span>
                    </div>
                    <span>-</span>
                    <div>
                      <span className="max-price">{price[1]} TND</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </aside>
  );
}