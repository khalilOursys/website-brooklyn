const routesData = [
  // New statistics route added here
  {
    path: "/statistics",
    name: "Statistiques",
    icon: "fas fa-chart-bar",
    role: ["admin"],
  },
  {
    path: "/heroBanner",
    name: "Hero Banner",
    icon: "fas fa-image",
    role: ["admin"],
  },
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
    path: "/productVariant",
    name: "Variantes produit",
    icon: "fas fa-bezier-curve",
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
];

export default routesData;
