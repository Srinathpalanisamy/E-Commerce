import React, { useEffect, useState } from "react";
import api from "../../services/api";
import { Box } from "@mui/material";
import ProductCard from "./ProductCard";

const API_URL = import.meta.env.VITE_API_URL;

const ProductGrid = ({ category }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    let isMounted = true;

    const fetchProducts = async () => {
      try {
        const endpoint = category
          ? `${API_URL}/api/products?category=${category}`
          : `${API_URL}/api/products`;
        const { data } = await api.get(endpoint);
        const fetchedProducts = Array.isArray(data) ? data : data.products || [];

        if (isMounted) {
          setProducts(
            fetchedProducts.map((product) => ({
              ...product,
              image: product.image.startsWith("http")
                ? product.image
                : `${API_URL}${product.image}`,
            }))
          );
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        if (isMounted) {
          setProducts([]);
        }
      }
    };

    fetchProducts();

    return () => {
      isMounted = false;
    };
  }, [category]);

  if (!products || products.length === 0) return null;

  return (
    <Box 
      sx={{ 
        display: "grid", 
        gridTemplateColumns: { 
          xs: "1fr", 
          sm: "repeat(2, 1fr)", 
          md: "repeat(4, 1fr)" 
        }, 
        gap: "30px", 
        width: "100%" 
      }}
    >
      {products.map((prod) => (
        <ProductCard key={prod.id} product={prod} />
      ))}
    </Box>
  );
};

export default ProductGrid;
