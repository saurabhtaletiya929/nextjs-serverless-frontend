// components/Registration.js

import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { Container, Typography, TextField, Button } from '@mui/material';
import { GET_CUSTOMER_DATA } from '~/components/Customer/Login/CustomerDataGraphql';
import { useAuth } from '~/providers/context/AuthContext';
const MyAccount = () => {
  const { loading, error, data } = useQuery(GET_CUSTOMER_DATA);
  const { user, logout } = useAuth();
  console.log("data", data)
  useEffect(() => {
    user(data)
  }, [data]);
  
  if(!data) return null;

  return (
    <Container maxWidth="xs">
      <div>
        <Typography variant="h5">My Account</Typography>
          My Account
      </div>
  </Container>
  );
};

export default MyAccount;
