import api from "./api";

export const createOrder = async (orderData) => {
  const response = await api.post(
    "/api/orders",
    {
      ...orderData,
      total_price: orderData.total_price,
    }
  );
  return response.data;
};

export const getOrders = async () => {
  const response = await api.get("/api/orders");
  return response.data;
};

export const cancelOrder = async (orderId) => {
  const response = await api.put(`/api/orders/cancel/${orderId}`, {});
  return response.data;
};
