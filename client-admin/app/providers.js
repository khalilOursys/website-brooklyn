"use client"; // Mark this as a Client Component

import { Provider } from "react-redux";
import { store } from "@/store"; // Adjust the path to your Redux store

export function Providers({ children }) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>{children}</Provider>
      </body>
    </html>
  );
}
