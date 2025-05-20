import React, { useEffect, useState } from "react";
import Link from "next/link";
import routesData from "./routesData";
import { Collapse, Nav } from "react-bootstrap";
import Image from "next/image"; // Use Next.js Image component

function Sidebar({ routes, background, users }) {
  const id_role = "admin";
  const [currentPath, setCurrentPath] = useState("");
  const [state, setState] = useState({});

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentPath(window.location.pathname);
    }
  }, []);

  const getCollapseInitialState = (routes) => {
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].collapse && getCollapseInitialState(routes[i].views)) {
        return true;
      } else if (currentPath === routes[i].layout + routes[i].path) {
        return true;
      }
    }
    return false;
  };

  const activeRoute = (routeName) => {
    return currentPath === routeName ? "active" : "";
  };

  const createLinks = (routes) => {
    return routes.map((prop, key) => {
      if (!prop.path) return null; // ✅ Fix: Prevents undefined path errors
      let st = {};
      if (prop.role.includes(id_role) || prop.role.includes(20)) {
        if (prop.redirect) {
          return null;
        }
        if (prop.collapse) {
          st[prop["state"]] = !state[prop.state] || false;
          return (
            <Nav.Item
              className={getCollapseInitialState(prop.views) ? "active" : ""}
              as="li"
              key={key}
            >
              <Nav.Link
                className={state[prop.state] ? "collapsed" : ""}
                data-toggle="collapse"
                onClick={(e) => {
                  e.preventDefault();
                  setState({ ...state, [prop.state]: !state[prop.state] });
                }}
                aria-expanded={state[prop.state] || false}
              >
                <i className={prop.icon}></i>
                <p>
                  {prop.name} <b className="caret"></b>
                </p>
              </Nav.Link>
              <Collapse in={state[prop.state] || false}>
                <div>
                  <Nav as="ul">{createLinks(prop.views)}</Nav>
                </div>
              </Collapse>
            </Nav.Item>
          );
        }
        return (
          <Nav.Item className={activeRoute(prop.path)} key={key} as="li">
            <Link href={prop.path} passHref legacyBehavior>
              <Nav.Link className={prop.className}>
                {prop.icon ? (
                  <>
                    <i className={prop.icon} />
                    <p>{prop.name}</p>
                  </>
                ) : (
                  <>
                    <span className="sidebar-mini">{prop.mini}</span>
                    <span className="sidebar-normal">{prop.name}</span>
                  </>
                )}
              </Nav.Link>
            </Link>
          </Nav.Item>
        );
      } else {
        return null;
      }
    });
  };

  return (
    <div className="sidebar" data-color={background}>
      <div className="sidebar-wrapper">
        <div className="logo">
          <div className="bglogo">
            <Image
              src="/images/logo/logo.png" // Use absolute path for images in the public folder
              alt="oursys"
              width={150} // Set appropriate width
              height={50} // Set appropriate height
            />
          </div>
        </div>
        <Nav as="ul">{createLinks(routesData)}</Nav>
      </div>
    </div>
  );
}

Sidebar.defaultProps = {
  image: "",
  background: "black",
  routes: [],
};

export default Sidebar;
