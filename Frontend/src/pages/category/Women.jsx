import React from "react";
import { Typography, Box, Container } from "@mui/material";
import ProductGrid from "../../components/product/ProductGrid";
import "./category.css";

const Women = () => {
  return (
    <div className="page">
      <Box 
        sx={{ 
          position: "relative",
          overflow: "hidden",
          width: "100%",
          minHeight: { xs: "50vh", md: "60vh" },
          display: "flex",
          alignItems: "center",
          bgcolor: "#111",
          backgroundImage: "url('https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=2000')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          mb: { xs: 6, md: 8 }
        }}
      >
        <Box sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "linear-gradient(to right, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0) 100%)",
          zIndex: 1
        }} />

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
                color: "#fff"
              }}
            >
              Women's Collection
            </Typography>
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 400,
                color: "rgba(255,255,255,0.85)",
                lineHeight: 1.6,
                maxWidth: "450px"
              }}
            >
              Discover the latest trends and timeless styles for women.
            </Typography>
          </Box>
        </Container>
      </Box>

      <div className="page-container">
        <ProductGrid category="women" />
      </div>
    </div>
  );
};

export default Women;
