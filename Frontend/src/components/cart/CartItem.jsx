import React from "react";
import { Box, Card, CardMedia, Typography, IconButton, useTheme } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

const CartItem = ({ item, onRemove }) => {
  const theme = useTheme();

  return (
    <Card 
      sx={{ 
        display: "flex", 
        alignItems: "center", 
        p: 2, 
        mb: 2, 
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        borderRadius: "12px",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
        "&:hover": {
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          transform: "translateY(-2px)"
        }
      }}
    >
      <CardMedia
        component="img"
        image={item.image}
        alt={item.name}
        sx={{ 
          width: 80, 
          height: 80, 
          objectFit: "contain", 
          borderRadius: "8px",
          bgcolor: "#f9f9f9",
          p: 1
        }}
      />
      <Box sx={{ flexGrow: 1, ml: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 600, fontSize: "1.1rem" }}>
          {item.name}
        </Typography>
        <Typography variant="body1" sx={{ color: theme.palette.primary.main, fontWeight: 700, mt: 0.5 }}>
          ₹{item.price}
        </Typography>
      </Box>
      <IconButton 
        onClick={() => onRemove(item.id)} 
        sx={{ 
          color: theme.palette.error.main,
          bgcolor: theme.palette.error.light + "20",
          "&:hover": { bgcolor: theme.palette.error.light + "40" }
        }}
      >
        <DeleteOutlineIcon />
      </IconButton>
    </Card>
  );
};

export default CartItem;