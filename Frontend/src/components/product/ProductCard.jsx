import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import {
  Card,
  Box,
  CardContent,
  Typography,
  Button,
  CardActionArea
} from "@mui/material";

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  return (
    <Card
      sx={{
        maxWidth: "100%",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        border: "1px solid transparent",
        "&:hover": {
          borderColor: "#eeeeee",
          "& .product-image": {
            transform: "scale(1.05)",
          },
          "& .add-button": {
            opacity: 1,
            transform: "translateY(0)",
          }
        },
      }}
    >
      <CardActionArea 
        onClick={() => navigate(`/product/${product.id}`)}
        sx={{ flexGrow: 1, display: "flex", flexDirection: "column", alignItems: "stretch", p: 2, bgcolor: "#f9f9f9" }}
      >
        <Box 
          sx={{ 
            position: "relative", 
            width: "100%", 
            height: "250px", 
            overflow: "hidden", 
            display: "flex", 
            justifyContent: "center", 
            alignItems: "center" 
          }}
        >
          <Box
            component="img"
            className="product-image"
            src={product.image}
            alt={product.name}
            sx={{
              maxHeight: "100%",
              maxWidth: "100%",
              objectFit: "contain",
              transition: "transform 0.4s ease",
            }}
          />
        </Box>
      </CardActionArea>

      <Box sx={{ p: 2, pt: 3, display: "flex", flexDirection: "column", gap: 1, position: "relative" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <Typography variant="subtitle1" fontWeight={700} sx={{ letterSpacing: "-0.01em" }} noWrap>
            {product.name}
          </Typography>
          <Typography variant="body1" fontWeight={600} sx={{ color: "text.secondary" }}>
            ₹{product.price}
          </Typography>
        </Box>
        
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Essentials Collection
        </Typography>

        <Button
          className="add-button"
          fullWidth
          variant="contained"
          color="primary"
          onClick={(e) => {
            e.stopPropagation();
            addToCart(product);
          }}
          sx={{
            mt: "auto",
            opacity: { xs: 1, md: 0 },
            transform: { xs: "none", md: "translateY(10px)" },
            transition: "all 0.3s ease",
            fontWeight: 700,
            letterSpacing: 1
          }}
        >
          Add to Cart
        </Button>
      </Box>
    </Card>
  );
};

export default ProductCard;