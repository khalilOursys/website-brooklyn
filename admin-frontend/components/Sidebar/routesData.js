const routesData = [
  {
    path: "/orders",
    name: "Commandes",
    icon: "fas fa-shopping-cart",
    role: ["admin"],
  },
  {
    path: "/ordersBulks",
    name: "Commandes en gros",
    icon: "fas fa-pallet",
    role: ["admin"],
  },
  {
    path: "/products",
    name: "Produits",
    icon: "fab fa-product-hunt",
    role: ["admin"],
  },
  {
    path: "/bulkProducts",
    name: "Produits en gros",
    icon: "fas fa-boxes",
    role: ["admin"],
  },
  {
    path: "/productBundles",
    name: "Packs produits",
    icon: "fas fa-box-open",
    role: ["admin"],
  },
  {
    path: "/users",
    name: "Utilisateurs",
    icon: "fas fa-users",
    role: ["admin"],
  },
  {
    path: "/bulkClientRequests",
    name: "Demandes clients (gros)",
    icon: "fas fa-handshake",
    role: ["admin"],
  },
  {
    path: "/brands",
    name: "Marques",
    icon: "fas fa-tags",
    role: ["admin"],
  },
  {
    path: "/categories",
    name: "Catégories",
    icon: "fas fa-list-alt",
    role: ["admin"],
  },
  /* {
    path: "/admin",
    name: "Paramètres",
    icon: "fas fa-cog",
    role: ["admin", "user"],
    collapse: true, // Cette route contient des sous-routes
    views: [
      {
        path: "/products",
        name: "Produits",
        icon: "fab fa-product-hunt",
        role: ["admin"],
      },
      {
        path: "/bulkProducts",
        name: "Produits en gros",
        icon: "fas fa-boxes",
        role: ["admin"],
      },
      {
        path: "/productBundles",
        name: "Packs produits",
        icon: "fas fa-box-open",
        role: ["admin"],
      },
      {
        path: "/users",
        name: "Utilisateurs",
        icon: "fas fa-users",
        role: ["admin"],
      },
      {
        path: "/bulkClientRequests",
        name: "Demandes clients (gros)",
        icon: "fas fa-handshake",
        role: ["admin"],
      },
      {
        path: "/brands",
        name: "Marques",
        icon: "fas fa-tags",
        role: ["admin"],
      },
      {
        path: "/categories",
        name: "Catégories",
        icon: "fas fa-list-alt",
        role: ["admin"],
      },
    ],
  }, */
  {
    path: "/",
    name: "Déconnexion",
    icon: "fas fa-sign-out-alt",
    role: ["admin", "user"],
  },
];

export default routesData;
