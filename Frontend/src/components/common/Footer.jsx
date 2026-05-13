import React from "react";
import { Box, Container, Typography, Link, IconButton, Divider } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import { FaEnvelope, FaPhone } from "react-icons/fa";

const Footer = () => {
  return (
    <Box 
      component="footer" 
      sx={{ 
        bgcolor: "#111111", 
        color: "#ffffff",
        pt: { xs: 8, md: 12 },
        pb: 6,
        mt: "auto",
      }}
    >
      <Container maxWidth="lg">
        <Box 
          sx={{ 
            display: "flex", 
            flexDirection: { xs: "column", md: "row" }, 
            justifyContent: "space-between", 
            alignItems: "flex-start",
            gap: { xs: 6, md: 0 } 
          }}
        >
          {/* Left Section */}
          <Box sx={{ maxWidth: { xs: "100%", md: "400px" } }}>
            <Typography
              variant="h5"
              sx={{ 
                fontWeight: 800,
                letterSpacing: 3,
                mb: 3,
                color: "#ffffff"
              }}
            >
              ORGAN.
            </Typography>
            <Typography variant="body1" sx={{ mb: 4, lineHeight: 1.8, color: "secondary.light" }}>
              Elevating the everyday. We create premium, sustainable essentials designed to outlast trends and seasons.
            </Typography>
            
            <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
              <IconButton size="small" sx={{ color: "secondary.light", "&:hover": { color: "#ffffff", transform: "translateY(-2px)" }, transition: "all 0.2s" }}>
                <FacebookIcon />
              </IconButton>
              <IconButton size="small" sx={{ color: "secondary.light", "&:hover": { color: "#ffffff", transform: "translateY(-2px)" }, transition: "all 0.2s" }}>
                <TwitterIcon />
              </IconButton>
              <IconButton size="small" sx={{ color: "secondary.light", "&:hover": { color: "#ffffff", transform: "translateY(-2px)" }, transition: "all 0.2s" }}>
                <InstagramIcon />
              </IconButton>
            </Box>
            
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, color: "secondary.light" }}>
                <FaEnvelope size={16} />
                <Typography variant="body2">organ@gmail.com</Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, color: "secondary.light" }}>
                <FaPhone size={16} />
                <Typography variant="body2">9788952011</Typography>
              </Box>
            </Box>
          </Box>
          
          {/* Right Section */}
          <Box sx={{ textAlign: { xs: "left", md: "right" } }}>
            <Typography variant="overline" fontWeight={700} sx={{ letterSpacing: 2, mb: 4, display: "block", color: "secondary.main" }}>
              SHOP
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Link component={RouterLink} to="/products" sx={{ color: "#fff", textDecoration: "none", fontSize: "0.95rem", "&:hover": { opacity: 0.7 } }}>New Arrivals</Link>
              <Link component={RouterLink} to="/men" sx={{ color: "#fff", textDecoration: "none", fontSize: "0.95rem", "&:hover": { opacity: 0.7 } }}>Men's Collection</Link>
              <Link component={RouterLink} to="/women" sx={{ color: "#fff", textDecoration: "none", fontSize: "0.95rem", "&:hover": { opacity: 0.7 } }}>Women's Collection</Link>
              <Link component={RouterLink} to="/kids" sx={{ color: "#fff", textDecoration: "none", fontSize: "0.95rem", "&:hover": { opacity: 0.7 } }}>Kids' Collection</Link>
            </Box>
          </Box>
        </Box>

        <Divider sx={{ mt: 10, mb: 4, borderColor: "rgba(255,255,255,0.1)" }} />
        
        <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="body2" sx={{ color: "secondary.main", fontSize: "0.8rem", letterSpacing: 1 }}>
            &copy; {new Date().getFullYear()} ORGAN STUDIOS. ALL RIGHTS RESERVED.
          </Typography>
          <Box sx={{ display: "flex", gap: 4, mt: { xs: 3, sm: 0 } }}>
            <Link href="#" variant="body2" sx={{ color: "secondary.main", textDecoration: "none", fontSize: "0.8rem", letterSpacing: 1, "&:hover": { color: "white" } }}>PRIVACY POLICY</Link>
            <Link href="#" variant="body2" sx={{ color: "secondary.main", textDecoration: "none", fontSize: "0.8rem", letterSpacing: 1, "&:hover": { color: "white" } }}>TERMS OF SERVICE</Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;