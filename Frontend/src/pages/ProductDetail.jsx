import React, { useContext, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import {
  Container,
  Typography,
  Box,
  Button,
  Divider,
  IconButton,
} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import AssignmentReturnOutlinedIcon from "@mui/icons-material/AssignmentReturnOutlined";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { CartContext } from "../context/CartContext";

const API_URL = "http://localhost:5000";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await api.get(`/api/products/${id}`);
        const foundProduct = res.data;

        if (foundProduct) {
          setProduct({
            ...foundProduct,
            image: foundProduct.image.startsWith("http")
              ? foundProduct.image
              : `${API_URL}${foundProduct.image}`,
          });
        } else {
          navigate("/products");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
        navigate("/products");
      }
    };

    fetchProduct();
  }, [id, navigate]);

  const handleQuantityChange = (type) => {
    if (type === "inc") {
      setQuantity((prev) => prev + 1);
    } else if (type === "dec" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  if (!product) return <p>Loading...</p>;

  return (
    <>
      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 8 } }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(-1)}
          sx={{
            mb: 4,
            color: "text.secondary",
            textTransform: "uppercase",
            letterSpacing: 1,
            fontWeight: 600,
            padding: 0,
            "&:hover": {
              bgcolor: "transparent",
              color: "primary.main",
            },
          }}
          disableRipple
        >
          Back to Shop
        </Button>

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: { xs: 4, md: 8 },
          }}
        >
          {/* IMAGE */}
          <Box
            sx={{
              flex: 1,
              backgroundColor: "#f7f7f7",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: { xs: 300, md: 500 },
            }}
          >
            <img
              src={product.image}
              alt={product.name}
              style={{ width: "100%", objectFit: "cover" }}
            />
          </Box>

          {/* DETAILS */}
          <Box sx={{ flex: 1 }}>
            <Typography
              variant="h4"
              fontWeight={700}
              sx={{ mb: 2 }}
            >
              {product.name}
            </Typography>

            <Typography variant="h5" sx={{ mb: 3 }}>
              ₹{product.price}
            </Typography>

            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ mb: 4 }}
            >
              Premium quality {product.name.toLowerCase()} for
              everyday comfort and style.
            </Typography>

            {/* QUANTITY */}
            <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
              <IconButton
                onClick={() => handleQuantityChange("dec")}
                disabled={quantity <= 1}
              >
                <RemoveIcon />
              </IconButton>

              <Typography sx={{ px: 2 }}>{quantity}</Typography>

              <IconButton onClick={() => handleQuantityChange("inc")}>
                <AddIcon />
              </IconButton>
            </Box>

            {/* BUTTONS */}
            <Box sx={{ display: "flex", gap: 2, mb: 4 }}>
              <Button
                variant="outlined"
                startIcon={<AddShoppingCartIcon />}
                onClick={handleAddToCart}
              >
                Add to Cart
              </Button>

              <Button
                variant="contained"
                onClick={() => {
                  handleAddToCart();
                  navigate("/checkout");
                }}
              >
                Buy Now
              </Button>
            </Box>

            <Divider sx={{ mb: 3 }} />

            {/* EXTRA INFO */}
            <Box>
              <Typography variant="body2" sx={{ mb: 1 }}>
                🚚 Free shipping in 3-5 days
              </Typography>
              <Typography variant="body2">
                🔁 30-day easy returns
              </Typography>
            </Box>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default ProductDetail;
