import React from "react";
import { Container, Typography, Box } from "@mui/material";
import ProductGrid from "../components/product/ProductGrid";
import Banner from "../components/common/Banner";

const Home = () => {
  return (
    <Box sx={{ pb: { xs: 8, md: 12 }, bgcolor: "#ffffff" }}>
      <Banner />

      <Container maxWidth="lg" sx={{ mt: { xs: 4, md: 8 } }}>
        <Box sx={{ textAlign: "center", mb: { xs: 6, md: 10 }, maxWidth: "700px", mx: "auto" }}>
          <Typography 
            variant="overline" 
            sx={{ letterSpacing: 2, color: "text.secondary", fontWeight: 700, display: "block", mb: 1 }}
          >
            DISCOVER
          </Typography>
          <Typography 
            variant="h3" 
            component="h2" 
            fontWeight={800} 
            sx={{ mb: 3, letterSpacing: "-0.02em" }}
          >
            The New Standard
          </Typography>
          <Typography 
            variant="body1" 
            color="text.secondary" 
            sx={{ lineHeight: 1.8, fontSize: "1.1rem", textAlign: "justify" }}
          >
            We believe in bringing you the best in fashion and lifestyle. Explore our carefully curated collection of premium products, designed to help you express your unique style with confidence and comfort.
          </Typography>
        </Box>

        <ProductGrid />
      </Container>
    </Box>
  );
};

export default Home;
