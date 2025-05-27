// Import CSS and SCSS files
"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import "@/styles/assets/scss/style.scss"; // Ensure the path is correct
import "@/styles/assets/css/style.css"; // Ensure the path is correct
import "@/styles/assets/css/responsive.css"; // Ensure the path is correct
import "@fortawesome/fontawesome-free/css/all.min.css";
import "react-toastify/dist/ReactToastify.css";

// Import global styles
import "./globals.css";
import { store } from "@/store";
import { Providers } from "./providers";

// RootLayout component
export default function RootLayout({ children }) {
  return <Providers store={store}>{children}</Providers>;
}
