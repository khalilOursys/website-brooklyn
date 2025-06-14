"use client";
import Configuration from "@/configuration";
import { allProducts } from "@/data/products";
import { openCartModal } from "@/utlis/openCartModal";
import { useRouter } from "next/navigation";
// import { openCart } from "@/utlis/toggleCart";
import React, { useEffect } from "react";
import { useContext, useState } from "react";
const dataContext = React.createContext();
export const useContextElement = () => {
  return useContext(dataContext);
};

export default function Context({ children }) {
  const api = Configuration.BACK_BASEURL;

  const [cartProducts, setCartProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [wishList, setWishList] = useState([1, 2, 3]);
  const [compareItem, setCompareItem] = useState([1, 2, 3]);
  const [quickViewItem, setQuickViewItem] = useState(allProducts[0]);
  const [quickAddItem, setQuickAddItem] = useState(1);
  const [user, setUser] = useState(null);
  const [isPacks, setIsPacks] = useState(0);
  const router = useRouter();

  const [totalPrice, setTotalPrice] = useState(0);
  useEffect(() => {
    const subtotal = cartProducts.reduce((accumulator, product) => {
      const discount = parseFloat(product.discount);
      const unitPrice = discount && discount !== 0 ? discount : parseFloat(product.price);
      return accumulator + parseFloat(product.quantity) * unitPrice;
    }, 0);
    setTotalPrice(subtotal);
  }, [cartProducts]);


  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${api}categories/structuredMobile`);
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        const data = await response.json();
        setCategories(data);
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchCategories();
  }, []);
  const addProductToCart = (item, qty) => {

    if (!cartProducts.filter((elm) => elm.id == item.id)[0]) {
      var newItem = {
        ...item,
        quantity: qty ? qty : 1,
      }
      setCartProducts((pre) => [...pre, newItem]);
      openCartModal();
    }
  };
  const isAddedToCartProducts = (id) => {
    if (cartProducts.filter((elm) => elm.id == id)[0]) {
      return true;
    }
    return false;
  };

  const updateQuantity = (id, qty) => {
    if (isAddedToCartProducts(id)) {
      let item = cartProducts.filter((elm) => elm.id == id)[0];
      let items = [...cartProducts];
      const itemIndex = items.indexOf(item);

      item.quantity = qty / 1;
      items[itemIndex] = item;
      setCartProducts(items);

      openCartModal();
    } else {
      addProductToCart(id, qty);
    }
  };
  const addToWishlist = (id) => {
    if (!wishList.includes(id)) {
      setWishList((pre) => [...pre, id]);
    } else {
      setWishList((pre) => [...pre].filter((elm) => elm != id));
    }
  };
  const removeFromWishlist = (id) => {
    if (wishList.includes(id)) {
      setWishList((pre) => [...pre.filter((elm) => elm != id)]);
    }
  };
  const addToCompareItem = (id) => {
    if (!compareItem.includes(id)) {
      setCompareItem((pre) => [...pre, id]);
    }
  };
  const removeFromCompareItem = (id) => {
    if (compareItem.includes(id)) {
      setCompareItem((pre) => [...pre.filter((elm) => elm != id)]);
    }
  };
  const isAddedtoWishlist = (id) => {
    if (wishList.includes(id)) {
      return true;
    }
    return false;
  };
  const isAddedtoCompareItem = (id) => {
    if (compareItem.includes(id)) {
      return true;
    }
    return false;
  };
  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("cartList"));
    if (items?.length) {
      setCartProducts(items);
    }
  }, []);

  useEffect(() => {

    localStorage.setItem("cartList", JSON.stringify(cartProducts));
  }, [cartProducts]);
  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("wishlist"));
    if (items?.length) {
      setWishList(items);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishList));
  }, [wishList]);

  // Fetch user profile when token changes
  useEffect(() => {
    let isMounted = true;

    const fetchUserProfile = async () => {
      const token = localStorage.getItem("x-access-token");
      if (!token) return;

      try {
        const profileResponse = await fetch(`${api}auth/profile`, {
          headers: { Authorization: `Bearer ${token}` },
          cache: 'no-store' // Disable caching
        });

        if (!isMounted) return;

        if (profileResponse.status === 401) {
          localStorage.removeItem("x-access-token");
          handleUnauthorized();
          return;
        }

        if (!profileResponse.ok) {
          throw new Error("Failed to fetch profile");
        }

        const userData = await profileResponse.json();
        if (isMounted) setUser(userData);
      } catch (error) {
        console.error("Profile fetch error:", error);
        if (isMounted) handleUnauthorized();
      }
    };

    fetchUserProfile();

    return () => {
      isMounted = false; // Cleanup
    };
  }, []);

  const handleUnauthorized = () => {
    /* localStorage.removeItem("x-access-token");
    setUser(null); */
    window.location.reload();
    // You might want to redirect to login here
  };

  const contextElement = {
    cartProducts,
    setCartProducts,
    totalPrice,
    addProductToCart,
    isAddedToCartProducts,
    removeFromWishlist,
    addToWishlist,
    isAddedtoWishlist,
    quickViewItem,
    wishList,
    setQuickViewItem,
    quickAddItem,
    setQuickAddItem,
    addToCompareItem,
    isAddedtoCompareItem,
    removeFromCompareItem,
    compareItem,
    setCompareItem,
    updateQuantity,
    user,
    setUser,
    categories,
    isPacks,
    setIsPacks
  };
  return (
    <dataContext.Provider value={contextElement}>
      {children}
    </dataContext.Provider>
  );
}
