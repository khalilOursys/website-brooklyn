"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContextElement } from "@/context/Context";
/* import { navItems } from "@/data/menu"; */
export default function MobileMenu() {
  const { categories, user } = useContextElement();
  const pathname = usePathname();

  // Initialize Bootstrap when component mounts
  useEffect(() => {
    if (typeof window !== 'undefined' && !window.bootstrap) {
      import('bootstrap').then((bootstrap) => {
        window.bootstrap = bootstrap;
      });
    }
  }, []);

  const handleRegisterClick = () => {
    // Close mobile menu
    const mobileMenu = document.getElementById('mobileMenu');
    if (mobileMenu) {
      if (window.bootstrap) {
        const bsOffcanvas = window.bootstrap.Offcanvas.getInstance(mobileMenu);
        if (bsOffcanvas) {
          bsOffcanvas.hide();
        }
      }
      // Fallback method
      const closeBtn = mobileMenu.querySelector('[data-bs-dismiss="offcanvas"]');
      closeBtn?.click();
    }

    // Open registration modal after slight delay
    setTimeout(() => {
      const registerModal = document.getElementById('registerBulkClient');
      if (registerModal && window.bootstrap) {
        let modal = window.bootstrap.Modal.getInstance(registerModal);
        if (!modal) {
          modal = new window.bootstrap.Modal(registerModal);
        }
        modal.show();
      }
    }, 150);
  };

  const navItems = [
    {
      id: "dropdown-menu-two",
      label: "Shop",
      links: categories,
    }
  ];

  const isMenuActive = (menuItem) => {
    let active = false;
    if (menuItem.href?.includes("/")) {
      if (menuItem.href?.split("/")[1] === pathname.split("/")[1]) {
        active = true;
      }
    }
    if (menuItem.links) {
      menuItem.links?.forEach((elm2) => {
        if (elm2.href?.includes("/")) {
          if (elm2.href?.split("/")[1] === pathname.split("/")[1]) {
            active = true;
          }
        }
        if (elm2.links) {
          elm2.links.forEach((elm3) => {
            if (elm3.href.split("/")[1] === pathname.split("/")[1]) {
              active = true;
            }
          });
        }
      });
    }
    return active;
  };

  return (
    <div className="offcanvas offcanvas-start canvas-mb" id="mobileMenu" tabIndex="-1">
      <span
        className="icon-close icon-close-popup"
        data-bs-dismiss="offcanvas"
        aria-label="Close"
      />
      <div className="mb-canvas-content">
        <div className="mb-body">
          <ul className="nav-ul-mb" id="wrapper-menu-navigation">
            <li className="nav-mb-item">
              <a href="/" className="mb-menu-link">
                Home
              </a>
            </li>
            <li className="nav-mb-item">
              <a href="/home2" className="mb-menu-link">
                Home 2
              </a>
            </li>
            <li className="nav-mb-item">
              <a
                href="/promotions"
                className={`mb-menu-link`}
              >
                promotions
              </a>
            </li>
            {user?.role === "BULK_CLIENT" && user !== null && (
              <li className="nav-mb-item">
                <a
                  href="/bulkproduct"
                  className={`mb-menu-link`}
                >
                  Bulk-Product
                </a>
              </li>
            )}
            {navItems.map((item, i) => (
              <li key={i} className="nav-mb-item">
                <a
                  href={`#${item.id}`}
                  className={`collapsed mb-menu-link current ${isMenuActive(item) ? "activeMenu" : ""}`}
                  data-bs-toggle="collapse"
                  aria-expanded="true"
                  aria-controls={item.id}
                >
                  <span>{item.label}</span>
                  <span className="btn-open-sub" />
                </a>
                <div id={item.id} className="collapse">
                  <ul className="sub-nav-menu">
                    {item.links.map((subItem, i2) => (
                      <li key={i2}>
                        {subItem.links ? (
                          <>
                            <a
                              href={`#${subItem.id}`}
                              className={`sub-nav-link collapsed ${isMenuActive(subItem) ? "activeMenu" : ""}`}
                              data-bs-toggle="collapse"
                              aria-expanded="true"
                              aria-controls={subItem.id}
                            >
                              <span>{subItem.label}</span>
                              <span className="btn-open-sub" />
                            </a>
                            <div id={subItem.id} className="collapse">
                              <ul className="sub-nav-menu sub-menu-level-2">
                                {subItem.links.map((innerItem, i3) => (
                                  <li key={i3}>
                                    <Link
                                      href={innerItem.href}
                                      className={`sub-nav-link ${isMenuActive(innerItem) ? "activeMenu" : ""}`}
                                    >
                                      {innerItem.label}
                                      {innerItem.demoLabel && (
                                        <div className="demo-label">
                                          <span className="demo-new">New</span>
                                        </div>
                                      )}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </>
                        ) : (
                          <Link
                            href={subItem.href}
                            className={`sub-nav-link ${isMenuActive(subItem) ? "activeMenu" : ""}`}
                          >
                            {subItem.label}
                            {subItem.demoLabel && (
                              <div className="demo-label">
                                <span className="demo-new">New</span>
                              </div>
                            )}
                          </Link>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ul>
          <div className="mb-other-content">
            {/* <div className="d-flex group-icon">
              <Link href={`/login`} className="site-nav-icon">
                <i className="icon icon-account" />
                Login
              </Link>
            </div> */}

            <div className="overflow-hidden">
              <p className="top-bar-text">
                Register as
                <button
                  className="tf-btn btn-line"
                  onClick={handleRegisterClick}
                >
                  <span className="text">Wholesaler</span>
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}