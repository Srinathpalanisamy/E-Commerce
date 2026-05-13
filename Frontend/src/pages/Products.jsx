import React, { useEffect, useState } from "react";
import { Container, Typography, Box } from "@mui/material";
import api from "../services/api";
import ProductCard from "../components/product/ProductCard";
import "./category/category.css";

const API_URL = import.meta.env.VITE_API_URL;

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get("/api/products");

        const updatedProducts = res.data.map((product) => ({
          ...product,
          image: product.image.startsWith("http")
            ? product.image
            : `${API_URL}${product.image}`,
        }));

        setProducts(updatedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <Box sx={{ pb: { xs: 8, md: 12 }, bgcolor: "#ffffff" }}>
      {/* HERO */}
      <Box
        sx={{
          position: "relative",
          overflow: "hidden",
          width: "100%",
          minHeight: { xs: "50vh", md: "60vh" },
          display: "flex",
          alignItems: "center",
          bgcolor: "#111",
          backgroundImage:
            "url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=2000')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          mb: { xs: 6, md: 8 },
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background:
              "linear-gradient(to right, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0) 100%)",
            zIndex: 1,
          }}
        />

        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 2 }}>
          <Box sx={{ maxWidth: "600px" }}>
            <Typography
              variant="h2"
              component="h1"
              sx={{
                fontWeight: 800,
                mb: 2,
                fontSize: { xs: "3rem", md: "4.5rem" },
                lineHeight: 1.05,
                letterSpacing: "-0.02em",
                color: "#fff",
              }}
            >
              The Collection
            </Typography>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 400,
                color: "rgba(255,255,255,0.85)",
                lineHeight: 1.6,
                maxWidth: "450px",
              }}
            >
              Explore our full range of uncompromising essentials.
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* PRODUCTS */}
      <div className="page-container">
        <div className="products">
          {products.length === 0 ? (
            <p>Loading products...</p>
          ) : (
            products.map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))
          )}
        </div>
      </div>
    </Box>
  );
};

export default Products;
