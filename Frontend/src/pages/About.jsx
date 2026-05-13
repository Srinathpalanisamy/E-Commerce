import React from "react";
import { Container, Typography, Box, Grid, Divider } from "@mui/material";

const About = () => {
  return (
    <Box sx={{ pb: { xs: 8, md: 12 }, bgcolor: "#ffffff" }}>
      <Box 
        sx={{ 
          position: "relative",
          overflow: "hidden",
          width: "100%",
          minHeight: { xs: "50vh", md: "60vh" },
          display: "flex",
          alignItems: "center",
          bgcolor: "#111",
          backgroundImage: "url('https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&q=80&w=2000')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          mb: { xs: 6, md: 10 }
        }}
      >
        <Box sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "linear-gradient(to right, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0) 100%)",
          zIndex: 1
        }} />

        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 2 }}>
          <Box sx={{ maxWidth: "800px" }}>
            <Typography 
              variant="h2" 
              component="h1" 
              sx={{ 
                fontWeight: 800, 
                mb: 3,
                fontSize: { xs: "3rem", md: "4.5rem" },
                lineHeight: 1.05,
                letterSpacing: "-0.03em",
                color: "#fff"
              }}
            >
              Redefining Essentials.
            </Typography>
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 400,
                color: "rgba(255,255,255,0.85)",
                lineHeight: 1.6,
                maxWidth: "600px"
              }}
            >
              We believe in stripping away the unnecessary to focus on what truly matters: quality, fit, and timeless design.
            </Typography>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="lg">
        {/* Mission & Vision */}
        <Grid container spacing={8} sx={{ mb: 10 }}>
          <Grid item xs={12} md={6}>
            <Box sx={{ p: { xs: 2, md: 4 } }}>
              <Typography variant="overline" sx={{ letterSpacing: 2, color: "text.secondary", fontWeight: 700 }}>
                Our Mission
              </Typography>
              <Typography variant="h4" sx={{ mt: 2, mb: 3, fontWeight: 700 }}>
                To craft garments that empower you.
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8, textAlign: "justify" }}>
                Every piece we create is designed with a single goal: to make you feel confident, comfortable, and ready to tackle whatever the day brings. We source the finest materials and employ ethical manufacturing practices to deliver apparel that not only looks good but does good.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ p: { xs: 2, md: 4 } }}>
              <Typography variant="overline" sx={{ letterSpacing: 2, color: "text.secondary", fontWeight: 700 }}>
                Our Vision
              </Typography>
              <Typography variant="h4" sx={{ mt: 2, mb: 3, fontWeight: 700 }}>
                A future of sustainable style.
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8, textAlign: "justify" }}>
                We envision a world where fashion isn't disposable. By focusing on durability and classic aesthetics, we aim to reduce the environmental footprint of the clothing industry. When you buy from us, you're investing in pieces meant to last a lifetime.
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 8 }} />

        {/* Core Values */}
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Typography variant="h3" fontWeight={800} sx={{ mb: 6 }}>
            Our Core Values
          </Typography>
        </Box>
        <Grid container spacing={4}>
          {[
            {
              title: "Uncompromising Quality",
              desc: "We don't cut corners. From the thread to the final stitch, excellence is our standard."
            },
            {
              title: "Ethical Sourcing",
              desc: "We partner with factories that treat their workers fairly and prioritize safe conditions."
            },
            {
              title: "Radical Transparency",
              desc: "You deserve to know how your clothes are made, what they cost, and where they come from."
            },
            {
              title: "Timeless Design",
              desc: "We ignore fleeting trends in favor of silhouettes that will still look sharp decades from now."
            }
          ].map((value, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Box sx={{ 
                p: 3, 
                height: "100%", 
                border: "1px solid #eeeeee",
                transition: "all 0.3s ease",
                "&:hover": {
                  borderColor: "#111111",
                  transform: "translateY(-5px)"
                }
              }}>
                <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
                  {value.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                  {value.desc}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default About;