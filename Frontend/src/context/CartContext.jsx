import React, { createContext, useEffect, useState } from "react";
import api from "../services/api";
import { Snackbar, Alert } from "@mui/material";
import { useAuth } from "./AuthContext";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { token } = useAuth();
  const [cart, setCart] = useState([]);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const fetchCart = async () => {
    const authToken = localStorage.getItem("token");

    if (!authToken) {
      setCart([]);
      return;
    }

    try {
      const res = await api.get("/api/cart", {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      const cartItems = res.data.map((item) => ({
        ...item,
        image: item.image.startsWith("http")
          ? item.image
          : `${import.meta.env.VITE_API_URL}${item.image}`,
      }));

      setCart(cartItems);
    } catch (error) {
      console.error("Error fetching cart:", error);
      setCart([]);
    }
  };

  useEffect(() => {
    const syncCart = async () => {
      if (token) {
        await fetchCart();
        return;
      }

      setCart([]);
    };

    syncCart();
  }, [token]);

  const addToCart = async (product, quantity = 1) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login first");
        return;
      }

      await api.post(
        "/api/cart",
        {
          product_id: product.id,
          quantity,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      await fetchCart();
      setSnackbar({
        open: true,
        message: `${product.name || "Item"} added to cart!`,
        severity: "success",
      });
    } catch (error) {
      console.error("Error adding to cart:", error);
      setSnackbar({
        open: true,
        message: "Failed to add item to cart.",
        severity: "error",
      });
    }
  };

  const removeFromCart = async (id) => {
    const previousCart = [...cart];
    setCart((currentCart) => currentCart.filter((item) => item.id !== id));

    try {
      await api.delete(`/api/cart/${id}`);
      setSnackbar({
        open: true,
        message: "Item removed from cart.",
        severity: "info",
      });
    } catch (error) {
      console.error("Error removing from cart:", error);
      setCart(previousCart);
      setSnackbar({
        open: true,
        message: "Failed to remove item.",
        severity: "error",
      });
    }
  };

  const updateQuantity = async (id, amount) => {
    const authToken = localStorage.getItem("token");
    const quantityChange = Number(amount);
    const previousCart = cart.map((item) => ({ ...item }));
    const currentItem = previousCart.find((item) => item.id === id);

    if (!authToken) {
      setSnackbar({
        open: true,
        message: "Please login first.",
        severity: "error",
      });
      return;
    }

    if (!currentItem || !Number.isInteger(quantityChange) || quantityChange === 0) {
      return;
    }

    const currentQuantity = currentItem.quantity || 1;
    const nextQuantity = Math.max(1, currentQuantity + quantityChange);

    if (nextQuantity === currentQuantity) {
      return;
    }

    setCart((currentCart) =>
      currentCart.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, (item.quantity || 1) + quantityChange) }
          : item
      )
    );

    try {
      await api.put(
        `/api/cart/${id}`,
        { amount: quantityChange },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
    } catch (error) {
      console.error("Error updating cart quantity:", error);
      setCart(previousCart);
      setSnackbar({
        open: true,
        message:
          error.response?.data?.error || "Failed to update quantity.",
        severity: "error",
      });
    }
  };

  const clearCart = async () => {
    try {
      await api.delete("/api/cart");
      await fetchCart();
      setSnackbar({
        open: true,
        message: "Cart cleared.",
        severity: "warning",
      });
    } catch (error) {
      console.error("Error clearing cart:", error);
      setSnackbar({
        open: true,
        message: "Failed to clear cart.",
        severity: "error",
      });
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbar({ ...snackbar, open: false });
  };

  const cartTotalItems = cart.reduce(
    (total, item) => total + (item.quantity || 1),
    0
  );
  const cartTotalPrice = cart.reduce(
    (total, item) => total + item.price * (item.quantity || 1),
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotalItems,
        cartTotalPrice,
      }}
    >
      {children}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleClose}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </CartContext.Provider>
  );
};
