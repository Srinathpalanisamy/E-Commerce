import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import {
  AppBar,
  Badge,
  Box,
  Button,
  Drawer,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";

const Navbar = () => {
  const { cart, cartTotalItems } = useContext(CartContext);
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const profileMenuRef = useRef(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  const isHome = [
    "/",
    "/men",
    "/women",
    "/kids",
    "/products",
    "/about",
  ].includes(location.pathname);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setProfileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navItems = [
    { label: "Shop", path: "/products" },
    { label: "Men", path: "/men" },
    { label: "Women", path: "/women" },
    { label: "Kids", path: "/kids" },
    { label: "About", path: "/about" },
  ];

  const handleLogout = () => {
    setProfileMenuOpen(false);
    logout();
    navigate("/login");
  };

  const handleProfileMenuToggle = () => {
    setProfileMenuOpen((current) => !current);
  };

  const handleProfileMenuNavigate = (path) => {
    setProfileMenuOpen(false);
    navigate(path);
  };

  const profileMenuItems = [
    {
      label: "My Orders",
      icon: <ReceiptLongOutlinedIcon sx={{ fontSize: 18 }} />,
      onClick: () => handleProfileMenuNavigate("/orders"),
    },
    {
      label: "Personal Information",
      icon: <PersonOutlineOutlinedIcon sx={{ fontSize: 18 }} />,
      onClick: () => handleProfileMenuNavigate("/profile"),
    },
    {
      label: "Logout",
      icon: <LogoutOutlinedIcon sx={{ fontSize: 18 }} />,
      onClick: handleLogout,
    },
  ];

  const drawer = (
    <Box
      onClick={handleDrawerToggle}
      sx={{ textAlign: "center", height: "100%", bgcolor: "background.default" }}
    >
      <Box sx={{ py: 4, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Box
          component="img"
          src="/organ_circle.png"
          alt="Organ Logo"
          onClick={() => navigate("/")}
          sx={{
            width: "64px",
            height: "64px",
            cursor: "pointer",
            objectFit: "cover",
            borderRadius: "50%",
          }}
        />
      </Box>

      <Divider sx={{ mx: 4, mb: 4 }} />

      <List sx={{ px: 2 }}>
        {navItems.map((item) => (
          <ListItem key={item.label} disablePadding sx={{ mb: 2 }}>
            <ListItemButton
              onClick={() => navigate(item.path)}
              sx={{
                borderRadius: 0,
                color: location.pathname === item.path ? "primary.main" : "text.secondary",
                "&:hover": {
                  bgcolor: "transparent",
                  color: "primary.main",
                },
              }}
              disableRipple
            >
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{
                  fontWeight: location.pathname === item.path ? 800 : 500,
                  textAlign: "center",
                  textTransform: "uppercase",
                  letterSpacing: 2,
                  fontSize: "1.2rem",
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}

        {isAuthenticated ? null : (
          <>
            <ListItem disablePadding sx={{ mb: 2 }}>
              <ListItemButton onClick={() => navigate("/login")} disableRipple>
                <ListItemText
                  primary="Login"
                  primaryTypographyProps={{
                    fontWeight: 600,
                    textAlign: "center",
                    textTransform: "uppercase",
                    letterSpacing: 2,
                    fontSize: "1.2rem",
                  }}
                />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding sx={{ mb: 2 }}>
              <ListItemButton onClick={() => navigate("/register")} disableRipple>
                <ListItemText
                  primary="Register"
                  primaryTypographyProps={{
                    fontWeight: 600,
                    textAlign: "center",
                    textTransform: "uppercase",
                    letterSpacing: 2,
                    fontSize: "1.2rem",
                  }}
                />
              </ListItemButton>
            </ListItem>
          </>
        )}

        <ListItem disablePadding sx={{ mt: 6, justifyContent: "center" }}>
          <Button
            variant="contained"
            onClick={() => navigate("/cart")}
            sx={{ px: 6, py: 2, letterSpacing: 2 }}
          >
            BAG ({cartTotalItems || cart.length})
          </Button>
        </ListItem>
      </List>
    </Box>
  );

  const isTransparent = isHome && !scrolled;
  const textColor = isTransparent ? "#ffffff" : "#111111";
  const bgColor = isTransparent ? "transparent" : "rgba(255, 255, 255, 0.98)";

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          backgroundColor: bgColor,
          color: textColor,
          transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
          borderBottom: scrolled
            ? "1px solid rgba(0,0,0,0.05)"
            : "1px solid transparent",
          pt: scrolled ? 1.5 : 3,
          pb: scrolled ? 1.5 : 3,
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between", px: { xs: 3, md: 8 } }}>
          <Box sx={{ display: "flex", alignItems: "center", width: "50%" }}>
            {isMobile && (
              <IconButton
                onClick={handleDrawerToggle}
                edge="start"
                sx={{
                  color: textColor,
                  mr: 2,
                  "&:hover": { bgcolor: "rgba(0,0,0,0.05)" },
                }}
              >
                <MenuIcon />
              </IconButton>
            )}

            <Box
              component="img"
              src="/organ.png"
              alt="Organ Logo"
              onClick={() => navigate("/")}
              sx={{
                height: { xs: "32px", md: "40px" },
                cursor: "pointer",
                objectFit: "contain",
                transition: "transform 0.2s ease",
                "&:hover": { transform: "scale(1.05)" },
                mr: { xs: 0, md: 5 },
              }}
            />

            {!isMobile && (
              <Box sx={{ display: "flex", alignItems: "center", gap: 5 }}>
                {navItems.map((item) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <Button
                      key={item.label}
                      onClick={() => navigate(item.path)}
                      disableRipple
                      sx={{
                        color: textColor,
                        fontWeight: 600,
                        fontSize: "0.85rem",
                        textTransform: "uppercase",
                        letterSpacing: 2,
                        position: "relative",
                        p: 0,
                        minWidth: "auto",
                        background: "transparent",
                        opacity: isActive ? 1 : 0.7,
                        "&::after": {
                          content: '""',
                          position: "absolute",
                          bottom: -6,
                          left: 0,
                          width: isActive ? "100%" : "0px",
                          height: "1px",
                          bgcolor: textColor,
                          transition: "width 0.3s ease",
                        },
                        "&:hover": {
                          bgcolor: "transparent",
                          opacity: 1,
                          "&::after": {
                            width: "100%",
                          },
                        },
                      }}
                    >
                      {item.label}
                    </Button>
                  );
                })}
              </Box>
            )}
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              width: "50%",
              gap: { xs: 1, md: 3 },
            }}
          >
            {!isMobile && !isAuthenticated && (
              <>
                <Button
                  onClick={() => navigate("/login")}
                  disableRipple
                  sx={{
                    color: textColor,
                    fontWeight: 600,
                    letterSpacing: 2,
                    px: 2.2,
                    py: 1.1,
                    minWidth: "auto",
                    borderRadius: "999px",
                    transition: "all 0.25s ease",
                    "&:hover": {
                      bgcolor: "rgba(17,17,17,0.06)",
                      opacity: 1,
                    },
                  }}
                >
                  Login
                </Button>
                <Button
                  onClick={() => navigate("/register")}
                  disableRipple
                  sx={{
                    color: textColor,
                    fontWeight: 600,
                    letterSpacing: 2,
                    px: 2.2,
                    py: 1.1,
                    minWidth: "auto",
                    borderRadius: "999px",
                    transition: "all 0.25s ease",
                    "&:hover": {
                      bgcolor: "rgba(17,17,17,0.06)",
                      opacity: 1,
                    },
                  }}
                >
                  Register
                </Button>
              </>
            )}

            {isAuthenticated && (
              <Box ref={profileMenuRef} sx={{ position: "relative", display: "flex" }}>
                <IconButton
                  onClick={handleProfileMenuToggle}
                  sx={{
                    color: textColor,
                    borderRadius: "999px",
                    "&:hover": {
                      bgcolor: "rgba(17,17,17,0.06)",
                      transform: "scale(1.05)",
                    },
                    transition: "all 0.25s ease",
                  }}
                  disableRipple
                >
                  <AccountCircleOutlinedIcon sx={{ fontSize: 28 }} />
                </IconButton>

                <Box
                  sx={{
                    position: "absolute",
                    top: "calc(100% + 12px)",
                    right: 0,
                    width: 180,
                    p: "10px",
                    borderRadius: "10px",
                    bgcolor: "#ffffff",
                    boxShadow: "0 16px 34px rgba(17, 17, 17, 0.12)",
                    border: "1px solid rgba(17,17,17,0.08)",
                    opacity: profileMenuOpen ? 1 : 0,
                    transform: profileMenuOpen
                      ? "translateY(0)"
                      : "translateY(-10px)",
                    visibility: profileMenuOpen ? "visible" : "hidden",
                    pointerEvents: profileMenuOpen ? "auto" : "none",
                    transition:
                      "opacity 0.22s ease, transform 0.22s ease, visibility 0.22s ease",
                    zIndex: 30,
                  }}
                >
                  {profileMenuItems.map((item) => (
                    <Box
                      key={item.label}
                      onClick={item.onClick}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1.25,
                        px: "10px",
                        py: "10px",
                        borderRadius: "8px",
                        color: "#111111",
                        cursor: "pointer",
                        transition: "background-color 0.2s ease, transform 0.2s ease",
                        "&:hover": {
                          bgcolor: "#f3f3f3",
                          transform: "translateX(2px)",
                        },
                      }}
                    >
                      {item.icon}
                      <Box sx={{ fontSize: "0.95rem", fontWeight: 500 }}>{item.label}</Box>
                    </Box>
                  ))}
                </Box>
              </Box>
            )}

            <IconButton
              onClick={() => navigate("/cart")}
              sx={{
                color: textColor,
                "&:hover": {
                  bgcolor: "transparent",
                  transform: "scale(1.1)",
                },
                transition: "all 0.2s ease",
              }}
              disableRipple
            >
              <Badge
                badgeContent={cartTotalItems || cart.length}
                sx={{
                  "& .MuiBadge-badge": {
                    bgcolor: textColor,
                    color: isTransparent ? "#111" : "#fff",
                    fontWeight: "bold",
                    borderRadius: "0",
                    px: 0.5,
                    height: "18px",
                    minWidth: "18px",
                    top: 2,
                    right: -2,
                  },
                }}
              >
                <ShoppingBagOutlinedIcon sx={{ fontSize: 26 }} />
              </Badge>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {!isHome && <Box sx={{ height: { xs: 80, md: 100 } }} />}

      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            width: "100%",
            maxWidth: "100%",
            borderRight: "none",
            boxShadow: "none",
          },
        }}
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

export default Navbar;
