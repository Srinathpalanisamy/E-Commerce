import React from "react";
import { Box, Typography, Button, Container } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router-dom";

const Banner = () => {
  const navigate = useNavigate();

  return (
    <Box 
      sx={{ 
        position: "relative",
        overflow: "hidden",
        width: "100%",
        minHeight: { xs: "80vh", md: "85vh" },
        display: "flex",
        alignItems: "center",
        bgcolor: "#111",
        backgroundImage: "url('https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&q=80&w=2000')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed"
      }}
    >
      {/* Overlay gradient for readability */}
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
            variant="h1" 
            component="h1" 
            sx={{ 
              fontWeight: 800, 
              mb: 2,
              fontSize: { xs: "3.5rem", md: "5.5rem" },
              lineHeight: 1.05,
              letterSpacing: "-0.04em",
              color: "#fff"
            }}
          >
            Organ – Crafted for You
          </Typography>
          <Typography 
            variant="h6" 
            sx={{ 
              mb: 5, 
              fontWeight: 400,
              color: "rgba(255,255,255,0.85)",
              lineHeight: 1.6,
              maxWidth: "450px"
            }}
          >
            Discover the pinnacle of minimalist fashion. Uncompromising quality, perfect fit, and timeless aesthetics.
          </Typography>
          <Button 
            variant="contained" 
            size="large"
            endIcon={<ArrowForwardIcon />}
            onClick={() => navigate("/products")}
            sx={{ 
              bgcolor: "white", 
              color: "#111111",
              px: 6,
              py: 2,
              borderRadius: "0px",
              fontWeight: 700,
              fontSize: "1.05rem",
              letterSpacing: 1.5,
              "&:hover": {
                bgcolor: "#eeeeee",
                transform: "translateX(5px)",
              }
            }}
          >
            Shop Now
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Banner;