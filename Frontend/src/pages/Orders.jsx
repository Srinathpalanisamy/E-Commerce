import React, { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  Divider,
  Typography,
} from "@mui/material";
import { cancelOrder, getOrders } from "../services/orderService";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [cancellingOrderId, setCancellingOrderId] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getOrders();
        setOrders(data);
      } catch (err) {
        setError(err.response?.data?.error || "Could not fetch orders.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleCancelOrder = async (orderId) => {
    setCancellingOrderId(orderId);
    setError("");

    try {
      await cancelOrder(orderId);
      setOrders((currentOrders) =>
        currentOrders.map((order) =>
          order.id === orderId ? { ...order, status: "cancelled" } : order
        )
      );
    } catch (err) {
      setError(err.response?.data?.error || "Could not cancel order.");
    } finally {
      setCancellingOrderId(null);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
      <Typography variant="h3" fontWeight={800} sx={{ mb: 6, letterSpacing: "-0.02em" }}>
        My Orders
      </Typography>

      {loading ? (
        <Box sx={{ py: 10, display: "flex", justifyContent: "center" }}>
          <CircularProgress color="primary" />
        </Box>
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : orders.length === 0 ? (
        <Box sx={{ py: 10, textAlign: "center", border: "1px dashed #ccc" }}>
          <Typography variant="h6" color="text.secondary">
            You have no orders yet.
          </Typography>
        </Box>
      ) : (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {orders.map((order) => (
            <Box key={order.id} sx={{ border: "1px solid #eee", bgcolor: "#fafafa", p: { xs: 3, md: 4 } }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", gap: 3, flexWrap: "wrap", mb: 3 }}>
                <Box>
                  <Typography variant="overline" sx={{ letterSpacing: 2, fontWeight: 700 }}>
                    ORDER #{order.id}
                  </Typography>
                  <Typography variant="h6" fontWeight={700}>
                    {order.user_name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color={order.status === "cancelled" ? "error.main" : "text.secondary"}
                    sx={{ textTransform: "capitalize" }}
                  >
                    Status: {order.status}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {new Date(order.created_at).toLocaleString()}
                  </Typography>
                </Box>
                <Box sx={{ textAlign: { xs: "left", md: "right" } }}>
                  <Typography variant="body2" color="text.secondary">
                    Total
                  </Typography>
                  <Typography variant="h6" fontWeight={800}>
                    Rs. {order.total_price}
                  </Typography>
                  {order.status !== "cancelled" ? (
                    <Button
                      variant="outlined"
                      size="small"
                      sx={{ mt: 2 }}
                      onClick={() => handleCancelOrder(order.id)}
                      disabled={cancellingOrderId === order.id}
                    >
                      {cancellingOrderId === order.id ? "Cancelling..." : "Cancel Order"}
                    </Button>
                  ) : null}
                </Box>
              </Box>

              <Divider sx={{ mb: 3 }} />

              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {order.items.map((item) => (
                  <Box
                    key={item.id}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: 2,
                      flexWrap: "wrap",
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <Box
                        component="img"
                        src={
                          item.image?.startsWith("http")
                            ? item.image
                            : `${import.meta.env.VITE_API_URL}${item.image}`
                        }
                        alt={item.name}
                        sx={{
                          width: 72,
                          height: 72,
                          objectFit: "contain",
                          bgcolor: "#fff",
                          p: 1,
                          border: "1px solid #eee",
                        }}
                      />
                      <Box>
                        <Typography variant="subtitle1" fontWeight={700}>
                          {item.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Qty: {item.quantity}
                        </Typography>
                      </Box>
                    </Box>
                    <Typography variant="body1" fontWeight={700}>
                      Rs. {item.price}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          ))}
        </Box>
      )}
    </Container>
  );
};

export default Orders;
