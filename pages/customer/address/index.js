import React, { useEffect } from "react";
import { Grid, Typography } from "@mui/material";
import { Aside } from "~/components/Aside/Aside";
import { useAuth } from "~/providers/context/AuthContext";

const AddressBook = () => {
  const { setToken, userData, user } = useAuth();
  useEffect(() => {
    const resultedToken = localStorage.getItem("token");
    setToken(resultedToken);
    user();
  });

  return (
    <Grid container spacing={4}>
      <Grid item xs={12} sm={3}>
        <Aside></Aside>
      </Grid>
      {userData && (
        <Grid item xs={12} sm={9}>
          <Typography variant="h5" mb={2}>
            Address Book
          </Typography>
          <Grid container spacing={2}>
            {userData?.customer.addresses.map((address, key) => {
              return (
                <Grid item xs={12} sm={6}>
                  <Typography fontWeight={700}>
                    Default Billing Address
                  </Typography>
                  <Typography>
                    {userData?.customer.firstname} {userData?.customer.lastname}
                  </Typography>
                  <Typography>{address.street}</Typography>
                  <Typography>
                    {address.city}, {address.region.region}
                  </Typography>
                  <Typography>T: {address.telephone}</Typography>
                </Grid>
              );
            })}
          </Grid>
        </Grid>
      )}
    </Grid>
  );
};

export default AddressBook;
