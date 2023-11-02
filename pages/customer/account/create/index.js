// components/Registration.js

import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Container, Typography, TextField, Button } from '@mui/material';
import { CREATE_CUSTOMER_MUTATION } from  '../../../../components/Customer/Create/CustomerCreateGraphql';
const Registration = () => {
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [createCustomer] = useMutation(CREATE_CUSTOMER_MUTATION);

  const handleRegistration = async () => {
    try {
      const { data } = await createCustomer({
        variables: { firstname, lastname, email, password },
      });
      // Handle successful registration, e.g., display a success message.
    } catch (error) {
      // Handle registration error (e.g., display an error message).
    }
  };

  return (
    <Container maxWidth="xs">
    <div>
      <Typography variant="h5">Create New Customer Account</Typography>
      <form>
      <TextField
          label="FirstName"
          variant="outlined"
          fullWidth
          margin="normal"
          value={firstname}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <TextField
          label="LastName"
          variant="outlined"
          fullWidth
          margin="normal"
          value={lastname}
          onChange={(e) => setLastName(e.target.value)}
        />
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={handleRegistration}>
          Create
        </Button>
      </form>
    </div>
  </Container>
  );
};

export default Registration;
