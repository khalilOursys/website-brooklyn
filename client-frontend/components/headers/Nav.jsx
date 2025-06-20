"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { allHomepages } from "@/data/menu";
import { usePathname } from "next/navigation";
import { useContextElement } from "@/context/Context";
import Configuration from "@/configuration";

export default function Nav({ isArrow = true, textColor = "", Linkfs = "" }) {
  const { user } = useContextElement();
  const api = Configuration.BACK_BASEURL;
  const pathname = usePathname();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${api}categories/structured`);
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        const data = await response.json();
        setCategories(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const isMenuActive = (menuItem) => {
    let active = false;
    if (menuItem.href?.includes("/")) {
      if (menuItem.href?.split("/")[1] == pathname.split("/")[1]) {
        active = true;
      }
    }
    if (menuItem.length) {
      active = menuItem.some(
        (elm) => elm.href?.split("/")[1] == pathname.split("/")[1]
      );
    }
    if (menuItem.length) {
      menuItem.forEach((item) => {
        item.links?.forEach((elm2) => {
          if (elm2.href?.includes("/")) {
            if (elm2.href?.split("/")[1] == pathname.split("/")[1]) {
              active = true;
            }
          }
          if (elm2.length) {
            elm2.forEach((item2) => {
              item2?.links?.forEach((elm3) => {
                if (elm3.href.split("/")[1] == pathname.split("/")[1]) {
                  active = true;
                }
              });
            });
          }
        });
        if (item.href?.includes("/")) {
          if (item.href?.split("/")[1] == pathname.split("/")[1]) {
            active = true;
          }
        }
      });
    }

    return active;
  };

  /* if (loading) {
    return <div>Loading menu...</div>;
  }

  if (error) {
    return <div>Error loading menu: {error}</div>;
  } */

  return (
    <>
      <li className="menu-item">
        <a
          href="/"
          className={`item-link ${Linkfs} ${textColor} ${isMenuActive(allHomepages) ? "activeMenu" : ""
            } `}
        >
          Accueil
        </a>
      </li>
      <li className="menu-item">
        <a
          href="#"
          className={`item-link ${Linkfs} ${textColor}`}
        >
          À propos
        </a>
      </li>
      <li className="menu-item">
        <a
          href="/promotions"
          className={`item-link ${Linkfs} ${textColor}`}
        >
          Promotions
        </a>
      </li>
      {user?.role === "BULK_CLIENT" &&
        user?.bulkRequests?.status?.toLowerCase() === "approuvée" && (
          <li className="menu-item">
            <a
              href="/bulkproduct"
              className={`item-link ${Linkfs} ${textColor}`}
            >
              Produit en gros
            </a>
          </li>
        )}

      <li className="menu-item">
        <a
          href="#"
          className={`item-link ${Linkfs} ${textColor} ${isMenuActive(categories) ? "activeMenu" : ""
            } `}
        >
          Produit
          {isArrow ? <i className="icon icon-arrow-down" /> : ""}
        </a>
        <div className="sub-menu mega-menu">
          <div className="container">
            <div className="row">
              {categories.map((menu, index) => (
                <div className="col-lg-2" key={index}>
                  <div className="mega-menu-item">
                    <div className="menu-heading">{menu.heading}</div>
                    <ul className="menu-list">
                      {menu.links.map((link, linkIndex) => (
                        <li key={linkIndex}>
                          <Link
                            href={link.href}
                            className={`menu-link-text link ${isMenuActive(link) ? "" : ""
                              }`}
                          >
                            {link.text}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </li>
      <li className="menu-item">
        <a
          href="#"
          className={`item-link ${Linkfs} ${textColor}`}
        >
          Contact
        </a>
      </li>
    </>
  );
}