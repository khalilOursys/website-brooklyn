const routesData = [
  /* {
    path: "/users",
    name: "Users",
    icon: "fas fa-users",
    role: ["admin"],
  }, */
  {
    path: "/orders",
    name: "Orders",
    icon: "fas fa-users",
    role: ["admin"],
  },
  {
    path: "/admin",
    name: "Settings",
    icon: "fas fa-cog",
    role: ["admin", "user"],
    collapse: true, // This route has nested routes
    views: [
      {
        path: "/products",
        name: "product",
        icon: "fab fa-product-hunt",
        role: ["admin"], // Roles allowed to access this route
      },
      {
        path: "/bulkProducts",
        name: "Bulk Product",
        icon: "fab fa-product-hunt",
        role: ["admin"], // Roles allowed to access this route
      },
      /* {
        path: "/productBundles",
        name: "Bundle Product",
        icon: "fab fa-product-hunt",
        role: ["admin"], // Roles allowed to access this route
      }, */
      {
        path: "/users",
        name: "Users",
        icon: "fas fa-users",
        role: ["admin"],
      },
      {
        path: "/bulkClientRequests",
        name: "Bulk Client Requests",
        icon: "fas fa-users",
        role: ["admin"],
      },
      {
        path: "/brands",
        name: "Brands",
        icon: "fas fa-signature",
        role: ["admin"],
      },
      {
        path: "/categories",
        name: "Categories",
        icon: "fas fa-file-alt",
        role: ["admin"],
      },
    ],
  },
  {
    path: "/",
    name: "Logout",
    icon: "fas fa-sign-out-alt",
    role: ["admin", "user"],
  },
];

export default routesData;
