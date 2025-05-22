const routesData = [
  /* {
    path: "/users",
    name: "Users",
    icon: "fas fa-users",
    role: ["admin"],
  }, */
  {
    path: "/admin/orders",
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
        path: "/admin/products",
        name: "product",
        icon: "fab fa-product-hunt",
        role: ["admin"], // Roles allowed to access this route
      },
      {
        path: "/admin/bulkProducts",
        name: "Bulk Product",
        icon: "fab fa-product-hunt",
        role: ["admin"], // Roles allowed to access this route
      },
      {
        path: "/admin/productBundles",
        name: "Bundle Product",
        icon: "fab fa-product-hunt",
        role: ["admin"], // Roles allowed to access this route
      },
      {
        path: "/admin/users",
        name: "Users",
        icon: "fas fa-users",
        role: ["admin"],
      },
      {
        path: "/admin/bulkClientRequests",
        name: "Bulk Client Requests",
        icon: "fas fa-users",
        role: ["admin"],
      },
      {
        path: "/admin/brands",
        name: "Brands",
        icon: "fas fa-signature",
        role: ["admin"],
      },
      {
        path: "/admin/categories",
        name: "Categories",
        icon: "fas fa-file-alt",
        role: ["admin"],
      },
    ],
  },
  {
    path: "/logout",
    name: "Logout",
    icon: "fas fa-sign-out-alt",
    role: ["admin", "user"],
  },
];

export default routesData;
