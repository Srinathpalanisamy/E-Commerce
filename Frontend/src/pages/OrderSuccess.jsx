import React, { useEffect } from "react";
import { Container, Typography, Box, Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import confetti from "canvas-confetti";

const OrderSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const orderId = location.state?.orderId;
  const paymentMethod = location.state?.paymentMethod;

  useEffect(() => {
    window.scrollTo(0, 0);

    const end = Date.now() + 2000;

    const frame = () => {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 70,
        origin: { x: 0 },
      });

      confetti({
        particleCount: 4,
        angle: 120,
        spread: 70,
        origin: { x: 1 },
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };

    frame();
  }, []);

  return (
    <Container
      maxWidth="sm"
      sx={{
        py: { xs: 8, md: 12 },
        minHeight: "70vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      <Box sx={{ width: "100%", p: 6, border: "1px solid #eeeeee", bgcolor: "#fafafa" }}>
        <CheckCircleOutlineIcon sx={{ fontSize: 80, color: "#111", mb: 3 }} />
        <Typography
          variant="h3"
          fontWeight={800}
          gutterBottom
          sx={{ letterSpacing: "-0.02em" }}
        >
          {paymentMethod === "online"
            ? "Payment Successful"
            : "Order Placed Successfully"}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4, lineHeight: 1.8 }}>
          {paymentMethod === "online"
            ? "Your payment was completed successfully."
            : "You will pay at delivery"}
        </Typography>
        {orderId ? (
          <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
            Order ID: #{orderId}
          </Typography>
        ) : null}
        <Button 
          variant="contained" 
          size="large" 
          onClick={() => navigate("/")}
          sx={{ px: 5, py: 1.5, fontWeight: 700, letterSpacing: 1 }}
        >
          Continue Shopping
        </Button>
      </Box>
    </Container>
  );
};

export default OrderSuccess;
