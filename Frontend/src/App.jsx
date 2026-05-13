import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme, CssBaseline, GlobalStyles, Box } from "@mui/material";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import Navbar from "./components/common/Navbar";
import PrivateRoute from "./components/common/PrivateRoute";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import OrderSuccess from "./pages/OrderSuccess";
import Profile from "./pages/Profile";
import ProductDetail from "./pages/ProductDetail";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Men from "./pages/category/Men";
import Women from "./pages/category/Women";
import Kids from "./pages/category/Kids";
import Footer from "./components/common/Footer";
import ScrollToTop from "./components/common/ScrollToTop";

const theme = createTheme({
  palette: {
    primary: {
      main: "#111111",
      light: "#333333",
      dark: "#000000",
    },
    secondary: {
      main: "#757575",
      light: "#a4a4a4",
      dark: "#494949",
    },
    background: {
      default: "#ffffff",
      paper: "#ffffff",
    },
    text: {
      primary: "#111111",
      secondary: "#757575",
    },
  },
  typography: {
    fontFamily: '"Helvetica Neue", "Inter", "Roboto", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      letterSpacing: "-0.02em",
    },
    h2: {
      fontWeight: 700,
      letterSpacing: "-0.01em",
    },
    h3: {
      fontWeight: 700,
    },
    h4: {
      fontWeight: 600,
    },
    button: {
      textTransform: "uppercase",
      letterSpacing: "1px",
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 14,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "999px",
          padding: "12px 24px",
          boxShadow: "0 10px 22px rgba(17,17,17,0.08)",
          transition: "all 0.3s ease",
          "&:hover": {
            boxShadow: "0 14px 28px rgba(17,17,17,0.12)",
            transform: "translateY(-1px)",
          },
        },
        containedPrimary: {
          backgroundColor: "#111111",
          color: "#ffffff",
          "&:hover": {
            backgroundColor: "#333333",
          },
        },
        outlinedPrimary: {
          borderColor: "#111111",
          borderWidth: "1px",
          "&:hover": {
            backgroundColor: "#111111",
            color: "#ffffff",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "20px",
          boxShadow: "0 18px 40px rgba(17,17,17,0.08)",
          border: "none",
          "&:hover": {
            boxShadow: "0 22px 44px rgba(17,17,17,0.1)",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          borderRadius: "20px",
        },
      },
    },
  },
});

const globalStyles = (
  <GlobalStyles
    styles={{
      body: {
        margin: 0,
        padding: 0,
        backgroundColor: "#ffffff",
        color: "#111111",
        WebkitFontSmoothing: "antialiased",
        MozOsxFontSmoothing: "grayscale",
      },
      "html, body, #root": {
        height: "100%",
      },
      "#root": {
        display: "flex",
        flexDirection: "column",
      },
      "*": {
        boxSizing: "border-box",
      },
    }}
  />
);

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {globalStyles}
      <AuthProvider>
        <CartProvider>
          <Router>
            <ScrollToTop />
            <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
              <Navbar />
              <Box component="main" sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/men" element={<Men />} />
                  <Route path="/women" element={<Women />} />
                  <Route path="/kids" element={<Kids />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route
                    path="/checkout"
                    element={
                      <PrivateRoute>
                        <Checkout />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/orders"
                    element={
                      <PrivateRoute>
                        <Orders />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/profile"
                    element={
                      <PrivateRoute>
                        <Profile />
                      </PrivateRoute>
                    }
                  />
                  <Route path="/order-success" element={<OrderSuccess />} />
                  <Route path="/product/:id" element={<ProductDetail />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                </Routes>
              </Box>
              <Footer />
            </Box>
          </Router>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
