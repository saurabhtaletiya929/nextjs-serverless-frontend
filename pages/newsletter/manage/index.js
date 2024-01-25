import React from "react";
import { Grid, Typography } from "@mui/material";
import { Aside } from "~/components/Aside/Aside";
const NewsletterSubcription = () => {
  return (
    <Grid container spacing={4}>
      <Grid item xs={12} sm={3}>
        <Aside></Aside>
      </Grid>
      <Grid item xs={12} sm={9}>
        <Typography variant="h5" mb={2}>
          Newsletter Subcriptions
        </Typography>
      </Grid>
    </Grid>
  );
};

export default NewsletterSubcription;
