import React, { useEffect } from "react";
import { Box, Container, Typography } from "@mui/material";
import { useRouter } from "next/router";

const LogoutSuccess = () => {
  const router = useRouter();
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/");
    }, 3000);
    return () => clearTimeout(timer);
  });

  return (
    <Container maxWidth={false}>
      <Container maxWidth="xl" sx={{ padding: "30px 20px" }}>
        <Box>
          <Typography variant="h5">You are signed out </Typography>
          <Typography>
            You have been signed out and you will redirect to homepage after 5
            seconds
          </Typography>
        </Box>
      </Container>
    </Container>
  );
};

export default LogoutSuccess;
