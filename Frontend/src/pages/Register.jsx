import React, { useState } from "react";
import {
  Alert,
  Box,
  Button,
  Container,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    user_name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setFormData((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      await register({
        user_name: formData.user_name,
        email: formData.email,
        password: formData.password,
      });
      navigate("/", { replace: true });
    } catch (err) {
      setError(err.response?.data?.error || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: { xs: 6, md: 10 } }}>
      <Box
        sx={{
          border: "1px solid #eee",
          borderRadius: 4,
          p: { xs: 4, md: 6 },
          bgcolor: "#fafafa",
          boxShadow: "0 18px 40px rgba(17,17,17,0.08)",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
          <Box
            component="img"
            src="/organ.png"
            alt="Organ Logo"
            sx={{
              width: { xs: 72, md: 92 },
              height: "auto",
              objectFit: "contain",
            }}
          />
        </Box>
        <Typography variant="h3" fontWeight={800} sx={{ mb: 2, letterSpacing: "-0.02em" }}>
          Register
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Create your account to securely place and track your orders.
        </Typography>

        {error ? <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert> : null}

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            required
            margin="normal"
            label="User Name"
            name="user_name"
            value={formData.user_name}
            onChange={handleChange}
            variant="standard"
          />
          <TextField
            fullWidth
            required
            margin="normal"
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            variant="standard"
          />
          <TextField
            fullWidth
            required
            margin="normal"
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            variant="standard"
          />
          <TextField
            fullWidth
            required
            margin="normal"
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            variant="standard"
          />

          <Button
            fullWidth
            type="submit"
            variant="contained"
            size="large"
            disabled={loading}
            sx={{ mt: 4, py: 1.8, fontWeight: 700, letterSpacing: 1 }}
          >
            {loading ? "Creating Account..." : "Register"}
          </Button>
        </Box>

        <Typography variant="body2" sx={{ mt: 3, color: "text.secondary" }}>
          Already have an account?{" "}
          <Link
            component={RouterLink}
            to="/login"
            underline="hover"
            sx={{ transition: "color 0.2s ease" }}
          >
            Login
          </Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default Register;
