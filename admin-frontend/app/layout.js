"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import "@/styles/assets/scss/style.scss";
import "@/styles/assets/css/style.css";
import "@/styles/assets/css/responsive.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";
import { store } from "@/store";
import { Providers } from "./providers";
import AuthChecker from "./AuthChecker"; // Import the new component

export default function RootLayout({ children }) {
  return (
    <Providers store={store}>
      <AuthChecker>{children}</AuthChecker>
    </Providers>
  );
}
