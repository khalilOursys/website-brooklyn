"use client";
import React, { useEffect, useState } from "react";
import Nav from "./Nav";
import Image from "next/image";
import Link from "next/link";
import { products44 } from "@/data/products";
import CartLength from "../common/CartLength";
import { useContextElement } from "@/context/Context";

export default function Header0() {
  const [token, setToken] = useState(null);
  const { user } = useContextElement();
  var role = user ? user.role : "";

  const [totalBulk, setTotalBulk] = useState(0);
  useEffect(() => {
    // This code runs only on the client
    const storedToken = localStorage.getItem("x-access-token");
    setToken(storedToken);
  }, []);
  useEffect(() => {
    // This code runs only on the client
    if (user) {
      setTotalBulk(user.cart ? user.cart.items.length : 0)
    }
  }, [user]);
  return (
    <header
      id="header"
      className="header-default header-style-2 header-style-4 header-brooklyn"
    >
      <div className="main-header line-1 bg_dark-2 tf-lg-hidden">
        <div className="container">
          <div className="row wrapper-header align-items-center">
            <div className="col-md-4 col-3 tf-lg-hidden">
              <a
                href="#mobileMenu"
                data-bs-toggle="offcanvas"
                aria-controls="offcanvasLeft"
                className="text_white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={16}
                  viewBox="0 0 24 16"
                  fill="none"
                >
                  <path
                    d="M2.00056 2.28571H16.8577C17.1608 2.28571 17.4515 2.16531 17.6658 1.95098C17.8802 1.73665 18.0006 1.44596 18.0006 1.14286C18.0006 0.839753 17.8802 0.549063 17.6658 0.334735C17.4515 0.120408 17.1608 0 16.8577 0H2.00056C1.69745 0 1.40676 0.120408 1.19244 0.334735C0.978109 0.549063 0.857702 0.839753 0.857702 1.14286C0.857702 1.44596 0.978109 1.73665 1.19244 1.95098C1.40676 2.16531 1.69745 2.28571 2.00056 2.28571ZM0.857702 8C0.857702 7.6969 0.978109 7.40621 1.19244 7.19188C1.40676 6.97755 1.69745 6.85714 2.00056 6.85714H22.572C22.8751 6.85714 23.1658 6.97755 23.3801 7.19188C23.5944 7.40621 23.7148 7.6969 23.7148 8C23.7148 8.30311 23.5944 8.59379 23.3801 8.80812C23.1658 9.02245 22.8751 9.14286 22.572 9.14286H2.00056C1.69745 9.14286 1.40676 9.02245 1.19244 8.80812C0.978109 8.59379 0.857702 8.30311 0.857702 8ZM0.857702 14.8571C0.857702 14.554 0.978109 14.2633 1.19244 14.049C1.40676 13.8347 1.69745 13.7143 2.00056 13.7143H12.2863C12.5894 13.7143 12.8801 13.8347 13.0944 14.049C13.3087 14.2633 13.4291 14.554 13.4291 14.8571C13.4291 15.1602 13.3087 15.4509 13.0944 15.6653C12.8801 15.8796 12.5894 16 12.2863 16H2.00056C1.69745 16 1.40676 15.8796 1.19244 15.6653C0.978109 15.4509 0.857702 15.1602 0.857702 14.8571Z"
                    fill="currnentColor"
                  />
                </svg>
              </a>
            </div>
            <div className="col-md-4 col-6">
              <Link href={`/`} className="logo-header">
                {/* BROOKLYN */}

                <Image
                  alt="logo"
                  className="logo"
                  src="/images/logo/logo.png"
                  width={273}
                  height={42}
                />
              </Link>
            </div>
            <div className="col-md-4 col-3">
              <ul className="nav-icon d-flex justify-content-end align-items-center gap-20">
                <li className="nav-search">
                  <a
                    href="#canvasSearch"
                    data-bs-toggle="offcanvas"
                    aria-controls="offcanvasLeft"
                    className="nav-icon-item"
                  >
                    <i className="icon icon-search" />
                  </a>
                </li>
                <li className="nav-account">
                  <a
                    href="#login"
                    data-bs-toggle="modal"
                    className="nav-icon-item align-items-center gap-10 text-white"
                  >
                    <i className="icon icon-account" />
                    <span className="text">Login</span>
                  </a>
                </li>
                <li className="nav-cart cart-lg line-left-1">
                  <a
                    href="#shoppingCart"
                    data-bs-toggle="modal"
                    className="nav-icon-item text-white"
                  >
                    <i className="icon icon-bag" />
                    <span className="count-box">
                      <CartLength />
                    </span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="header-bottom tf-md-hidden bg_dark-2">
        <div className="container">
          <div className="wrapper-header d-flex justify-content-between align-items-center">
            <div className="box-left">
              <Link href={`/`} className="logo-header">
                {/* BROOKLYN */}

                <Image
                  alt="logo"
                  className="logo"
                  src="/images/logo/logo3.png"
                  width={273}
                  height={42}
                />
              </Link>
              <div className="tf-list-categories">
                <a href="#" className="categories-title">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={14}
                    height={14}
                    viewBox="0 0 14 14"
                    fill="none"
                  >
                    <path
                      d="M4.83416 0H1.61897C0.726277 0 0 0.726277 0 1.61897V4.83416C0 5.72685 0.726277 6.45312 1.61897 6.45312H4.83416C5.72685 6.45312 6.45312 5.72685 6.45312 4.83416V1.61897C6.45312 0.726277 5.72685 0 4.83416 0ZM5.35938 4.83416C5.35938 5.12375 5.12375 5.35938 4.83416 5.35938H1.61897C1.32937 5.35938 1.09375 5.12375 1.09375 4.83416V1.61897C1.09375 1.32937 1.32937 1.09375 1.61897 1.09375H4.83416C5.12375 1.09375 5.35938 1.32937 5.35938 1.61897V4.83416ZM12.3594 0H9.1875C8.28286 0 7.54688 0.735984 7.54688 1.64062V4.8125C7.54688 5.71714 8.28286 6.45312 9.1875 6.45312H12.3594C13.264 6.45312 14 5.71714 14 4.8125V1.64062C14 0.735984 13.264 0 12.3594 0ZM12.9062 4.8125C12.9062 5.11405 12.6609 5.35938 12.3594 5.35938H9.1875C8.88595 5.35938 8.64062 5.11405 8.64062 4.8125V1.64062C8.64062 1.33908 8.88595 1.09375 9.1875 1.09375H12.3594C12.6609 1.09375 12.9062 1.33908 12.9062 1.64062V4.8125ZM4.83416 7.54688H1.61897C0.726277 7.54688 0 8.27315 0 9.16584V12.381C0 13.2737 0.726277 14 1.61897 14H4.83416C5.72685 14 6.45312 13.2737 6.45312 12.381V9.16584C6.45312 8.27315 5.72685 7.54688 4.83416 7.54688ZM5.35938 12.381C5.35938 12.6706 5.12375 12.9062 4.83416 12.9062H1.61897C1.32937 12.9062 1.09375 12.6706 1.09375 12.381V9.16584C1.09375 8.87625 1.32937 8.64062 1.61897 8.64062H4.83416C5.12375 8.64062 5.35938 8.87625 5.35938 9.16584V12.381ZM12.3594 7.54688H9.1875C8.28286 7.54688 7.54688 8.28286 7.54688 9.1875V12.3594C7.54688 13.264 8.28286 14 9.1875 14H12.3594C13.264 14 14 13.264 14 12.3594V9.1875C14 8.28286 13.264 7.54688 12.3594 7.54688ZM12.9062 12.3594C12.9062 12.6609 12.6609 12.9062 12.3594 12.9062H9.1875C8.88595 12.9062 8.64062 12.6609 8.64062 12.3594V9.1875C8.64062 8.88595 8.88595 8.64062 9.1875 8.64062H12.3594C12.6609 8.64062 12.9062 8.88595 12.9062 9.1875V12.3594Z"
                      fill="currentColor"
                    />
                  </svg>
                  Browse All Categories
                </a>
                <div className="list-categories-inner toolbar-shop-mobile">
                  <ul className="nav-ul-mb" id="wrapper-menu-navigation">
                    <li className="nav-mb-item">
                      <a
                        href="#cate-menu-three"
                        className="tf-category-link has-children collapsed mb-menu-link"
                        data-bs-toggle="collapse"
                        aria-expanded="true"
                        aria-controls="cate-menu-three"
                      >
                        <div className="image">
                          <Image
                            alt=""
                            src="/images/shop/cate/cate9.jpg"
                            width={40}
                            height={49}
                          />
                        </div>
                        <span className="link">Smartphone & Mobile</span>
                        <span className="btn-open-sub" />
                      </a>
                      <div id="cate-menu-three" className="collapse list-cate">
                        <ul className="sub-nav-menu" id="cate-menu-navigation2">
                          <li>
                            <Link
                              href={`/category/Smartphone`}
                              className="tf-category-link sub-nav-link"
                            >
                              <div className="image">
                                <Image
                                  alt=""
                                  src="/images/shop/cate/cate4.png"
                                  width={40}
                                  height={48}
                                />
                              </div>
                              <span>Smartphone</span>
                            </Link>
                          </li>
                          {/* <li>
                            <Link
                              href={`/shop-default`}
                              className="tf-category-link sub-nav-link"
                            >
                              <div className="image">
                                <Image
                                  alt=""
                                  src="/images/shop/cate/cate7.jpg"
                                  width={40}
                                  height={41}
                                />
                              </div>
                              <span>Tee</span>
                            </Link>
                          </li> */}
                        </ul>
                      </div>
                    </li>
                    <li className="nav-mb-item">
                      <a
                        href="#cate-menu-three1"
                        className="tf-category-link has-children collapsed mb-menu-link"
                        data-bs-toggle="collapse"
                        aria-expanded="true"
                        aria-controls="cate-menu-three"
                      >
                        <div className="image">
                          <Image
                            alt=""
                            src="/images/shop/cate/cate9.jpg"
                            width={40}
                            height={49}
                          />
                        </div>
                        <span className="link">PC portable & bureautique</span>
                        <span className="btn-open-sub" />
                      </a>
                      <div id="cate-menu-three1" className="collapse list-cate">
                        <ul className="sub-nav-menu" id="cate-menu-navigation2">
                          <li>
                            <Link
                              href={`/category/pc-gamer`}
                              className="tf-category-link sub-nav-link"
                            >
                              <div className="image">
                                <Image
                                  alt=""
                                  src="/images/shop/cate/cate4.png"
                                  width={40}
                                  height={48}
                                />
                              </div>
                              <span>PC</span>
                            </Link>
                          </li>
                          <li>
                            <Link
                              href={`/category/accesoire`}
                              className="tf-category-link sub-nav-link"
                            >
                              <div className="image">
                                <Image
                                  alt=""
                                  src="/images/shop/cate/cate7.jpg"
                                  width={40}
                                  height={41}
                                />
                              </div>
                              <span>Accesoire</span>
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </li>
                  </ul>
                  {/* <div className="categories-bottom">
                    <Link
                      href={`/shop-collection-sub`}
                      className="tf-btn btn-line collection-other-link"
                    >
                      <span>View all collection</span>
                      <i className="icon icon-arrow1-top-left" />
                    </Link>
                  </div> */}
                </div>
              </div>
              <nav className="box-navigation text-center">
                <ul className="box-nav-ul d-flex align-items-center justify-content-center gap-30">
                  <Nav textColor="text-white" />
                </ul>
              </nav>
            </div>
            <div className="box-right">
              <div className="d-grid">

                <ul className="nav-icon d-flex justify-content-end align-items-center gap-20">
                  <li className="nav-search">
                    <a
                      href="#canvasSearch"
                      data-bs-toggle="offcanvas"
                      aria-controls="offcanvasLeft"
                      className="nav-icon-item"
                    >
                      <i className="icon icon-search" />
                    </a>
                  </li>

                  <li className="nav-account">
                    {!token ? <a
                      href="#login"
                      data-bs-toggle="modal"
                      className="nav-icon-item align-items-center gap-10 text-white"
                    >
                      <i className="icon icon-account" />
                      <span className="text">Login</span>
                    </a> : <a
                      href="/my-account-edit"
                      className="nav-icon-item align-items-center gap-10 text-white"
                    >
                      <i className="icon icon-account" />
                      <span className="text">my account</span>
                    </a>}
                  </li>
                  {token ? (
                    <li className="nav-account">
                      <button
                        onClick={() => {
                          localStorage.removeItem("x-access-token");
                          setToken(null);
                          // Optional: reload page or update user context
                          window.location.reload(); // or navigate to home
                        }}
                        className="nav-icon-item align-items-center gap-10 text-white bg-transparent border-0"
                      >
                        <i className="fas fa-sign-out-alt" />
                        <span className="text">Logout</span>
                      </button>
                    </li>
                  ) : ("")}

                  {role === "BULK_CLIENT" && (
                    <li className="nav-cart cart-lg line-left-1">
                      <a href="/cart-bulk" className="nav-icon-item text-white">
                        <i className="fas fa-wallet"></i>
                        <span className="count-box">{totalBulk}</span>
                      </a>
                    </li>
                  )}

                  <li className="nav-cart cart-lg line-left-1">
                    <a
                      href="#shoppingCart"
                      data-bs-toggle="modal"
                      className="nav-icon-item text-white"
                    >
                      <i className="icon icon-bag" />
                      <span className="count-box">
                        <CartLength />
                      </span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
