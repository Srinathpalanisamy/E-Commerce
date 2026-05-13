import React, { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import { getProfile, updateProfile } from "../services/authService";

const Profile = () => {
  const [profileData, setProfileData] = useState({
    user_name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zip_code: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile();
        setProfileData({
          user_name: data.user_name || "",
          email: data.email || "",
          phone: data.phone || "",
          address: data.address || "",
          city: data.city || "",
          zip_code: data.zip_code || "",
        });
      } catch (err) {
        setError(err.response?.data?.error || "Could not fetch profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProfileData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setError("");

    try {
      await updateProfile({
        phone: profileData.phone,
        address: profileData.address,
        city: profileData.city,
        zip_code: profileData.zip_code,
      });
    } catch (err) {
      setError(err.response?.data?.error || "Could not update profile.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Container
      maxWidth={false}
      sx={{
        py: { xs: 4, md: 6 },
        px: { xs: 2, md: 4 },
        display: "flex",
        justifyContent: "flex-end",
      }}
    >
      <Box
        sx={{
          width: { xs: "100%", md: "72%" },
          minHeight: { md: "calc(100vh - 180px)" },
          border: "1px solid #eee",
          borderRadius: 4,
          p: { xs: 4, md: 6 },
          bgcolor: "#fafafa",
          boxShadow: "0 18px 40px rgba(17,17,17,0.08)",
        }}
      >
        <Typography variant="h3" fontWeight={800} sx={{ mb: 2, letterSpacing: "-0.02em" }}>
          Personal Information
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Manage your contact and delivery details.
        </Typography>

        {error ? <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert> : null}

        {loading ? (
          <Box sx={{ py: 8, display: "flex", justifyContent: "center" }}>
            <CircularProgress color="primary" />
          </Box>
        ) : (
          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              margin="normal"
              label="User Name"
              value={profileData.user_name}
              disabled
              variant="standard"
            />
            <TextField
              fullWidth
              margin="normal"
              label="Email"
              value={profileData.email}
              disabled
              variant="standard"
            />
            <TextField
              fullWidth
              margin="normal"
              label="Phone"
              name="phone"
              value={profileData.phone}
              onChange={handleChange}
              variant="standard"
            />
            <TextField
              fullWidth
              margin="normal"
              label="Address"
              name="address"
              value={profileData.address}
              onChange={handleChange}
              variant="standard"
            />
            <TextField
              fullWidth
              margin="normal"
              label="City"
              name="city"
              value={profileData.city}
              onChange={handleChange}
              variant="standard"
            />
            <TextField
              fullWidth
              margin="normal"
              label="Zip Code"
              name="zip_code"
              value={profileData.zip_code}
              onChange={handleChange}
              variant="standard"
            />

            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={saving}
              sx={{ mt: 4, px: 4 }}
            >
              {saving ? "Saving..." : "Save Changes"}
            </Button>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default Profile;
