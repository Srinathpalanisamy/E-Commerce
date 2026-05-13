import React, { useContext, useEffect, useState } from "react";
import {
  Container,
  Typography,
  Box,
  Grid,
  TextField,
  Button,
  Divider,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createOrder } from "../services/orderService";
import { getProfile } from "../services/authService";

const Checkout = () => {
  const { cart, clearCart, cartTotalPrice } = useContext(CartContext);
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zipCode: "",
  });

  const total = cartTotalPrice;

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profile = await getProfile();
        const nameParts = (profile.user_name || "").trim().split(/\s+/).filter(Boolean);

        setFormData((current) => ({
          ...current,
          firstName: nameParts[0] || "",
          lastName: nameParts.slice(1).join(" "),
          email: profile.email || "",
          phone: profile.phone || "",
          address: profile.address || "",
          city: profile.city || "",
          zipCode: profile.zip_code || "",
        }));
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (cart.length === 0) return;

    setError("");
    setIsPlacingOrder(true);

    try {
      const items = cart.map((item) => ({
        product_id: item.product_id,
        quantity: item.quantity,
      }));

      const orderResponse = await createOrder({
        address: formData.address,
        city: formData.city,
        zipCode: formData.zipCode,
        phone: formData.phone,
        email: formData.email,
        paymentMethod,
        items,
        total_price: total,
      });

      await clearCart();
      navigate("/order-success", {
        state: {
          orderId: orderResponse.order.id,
          paymentMethod,
        },
      });
    } catch (err) {
      console.error("Error placing order:", err);
      setError(
        err.response?.data?.error || "Could not place your order. Please try again."
      );
    } finally {
      setIsPlacingOrder(false);
    }
  };

  const mainProduct = cart.length > 0 ? cart[0] : null;

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
      <Typography
        variant="h3"
        fontWeight={800}
        sx={{
          mb: 6,
          letterSpacing: "-0.02em",
          display: "flex",
          alignItems: "center",
          gap: 2,
        }}
      >
        Checkout
        <LockOutlinedIcon sx={{ color: "text.secondary" }} />
      </Typography>

      {cart.length === 0 ? (
        <Box sx={{ textAlign: "center", py: 10, border: "1px dashed #ccc" }}>
          <Typography variant="h6" color="text.secondary">
            Your cart is empty.
          </Typography>
          <Button
            variant="outlined"
            onClick={() => navigate("/products")}
            sx={{ mt: 3 }}
          >
            Go to Shop
          </Button>
        </Box>
      ) : (
        <Box
          className="checkout-container"
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: "30px",
            px: { xs: 0, md: 2 },
          }}
        >
          <Box className="left-section" sx={{ width: { xs: "100%", md: "40%" } }}>
            {mainProduct && (
              <Box sx={{ mb: 4 }}>
                <Box
                  component="img"
                  src={mainProduct.image}
                  alt={mainProduct.name}
                  sx={{
                    width: "100%",
                    height: "400px",
                    objectFit: "cover",
                    mb: 2,
                    bgcolor: "#f9f9f9",
                  }}
                />
                <Typography variant="h5" fontWeight={800} sx={{ mb: 1 }}>
                  {mainProduct.name}
                </Typography>
                <Typography variant="h6" color="text.secondary">
                  Rs. {mainProduct.price}
                </Typography>
              </Box>
            )}

            <Box sx={{ p: 4, bgcolor: "#f9f9f9" }}>
              <Typography
                variant="overline"
                fontWeight={700}
                sx={{ letterSpacing: 2, mb: 3, display: "block" }}
              >
                Order Summary
              </Typography>

              <Box sx={{ mb: 4, maxHeight: "250px", overflowY: "auto", pr: 1 }}>
                {cart.map((item, index) => (
                  <Box
                    key={`${item.id}-${index}`}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mb: 3,
                      alignItems: "center",
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <Box
                        component="img"
                        src={item.image}
                        alt={item.name}
                        sx={{
                          width: 60,
                          height: 60,
                          objectFit: "contain",
                          bgcolor: "#fff",
                          p: 1,
                          border: "1px solid #eee",
                        }}
                      />
                      <Typography
                        variant="body2"
                        fontWeight={600}
                        sx={{ maxWidth: 150 }}
                      >
                        {item.name}
                      </Typography>
                    </Box>
                    <Typography variant="body2" fontWeight={700}>
                      Rs. {item.price}
                    </Typography>
                  </Box>
                ))}
              </Box>

              <Divider sx={{ my: 3 }} />

              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                <Typography variant="body1" color="text.secondary">
                  Subtotal
                </Typography>
                <Typography variant="body1" fontWeight={600}>
                  Rs. {total}
                </Typography>
              </Box>

              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                <Typography variant="body1" color="text.secondary">
                  Shipping
                </Typography>
                <Typography
                  variant="body1"
                  fontWeight={600}
                  sx={{
                    textTransform: "uppercase",
                    fontSize: "0.85rem",
                    letterSpacing: 1,
                  }}
                >
                  Complimentary
                </Typography>
              </Box>

              <Divider sx={{ my: 3 }} />

              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="h5" fontWeight={800}>
                  Total
                </Typography>
                <Typography variant="h5" fontWeight={800}>
                  Rs. {total}
                </Typography>
              </Box>
            </Box>
          </Box>

          <Box
            className="right-section"
            sx={{ width: { xs: "100%", md: "60%" }, pl: { xs: 0, md: 4 } }}
          >
            <form onSubmit={handleSubmit}>
              {error ? (
                <Typography variant="body2" color="error" sx={{ mb: 3 }}>
                  {error}
                </Typography>
              ) : null}

              <Box sx={{ mb: 6 }}>
                <Typography
                  variant="overline"
                  fontWeight={700}
                  sx={{ letterSpacing: 2, display: "block", mb: 3 }}
                >
                  1. Shipping Information
                </Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      label="First Name"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      variant="standard"
                    />
                  </Grid>
                 
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      type="email"
                      label="Email Address"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      variant="standard"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Phone Number"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      variant="standard"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      label="Street Address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      variant="standard"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      label="City"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      variant="standard"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      label="Postal Code"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleChange}
                      variant="standard"
                    />
                  </Grid>
                </Grid>
              </Box>

              <Box sx={{ mb: 6 }}>
                <Typography
                  variant="overline"
                  fontWeight={700}
                  sx={{ letterSpacing: 2, display: "block", mb: 3 }}
                >
                  2. Payment Method
                </Typography>
                <FormControl component="fieldset" sx={{ width: "100%", mb: 4 }}>
                  <RadioGroup
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  >
                    <Box sx={{ border: "1px solid #eee", mb: 2, p: 2 }}>
                      <FormControlLabel
                        value="cod"
                        control={<Radio color="primary" />}
                        label={<Typography fontWeight={600}>Cash on Delivery</Typography>}
                      />
                    </Box>

                    <Box sx={{ border: "1px solid #eee", p: 2 }}>
                      <FormControlLabel
                        value="online"
                        control={<Radio color="primary" />}
                        label={<Typography fontWeight={600}>Online Payment</Typography>}
                      />
                    </Box>
                  </RadioGroup>
                </FormControl>
              </Box>

              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                fullWidth
                disabled={cart.length === 0 || isPlacingOrder}
                sx={{ py: 2, fontSize: "1.1rem", fontWeight: 800, letterSpacing: 1 }}
              >
                {isPlacingOrder ? "Placing Order..." : `Pay Rs. ${total} Now`}
              </Button>
            </form>
          </Box>
        </Box>
      )}
    </Container>
  );
};

export default Checkout;
