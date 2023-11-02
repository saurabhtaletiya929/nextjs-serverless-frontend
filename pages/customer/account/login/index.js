// components/Login.js

import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Container, Typography, TextField, Button } from '@mui/material';
import { LOGIN_MUTATION } from '../../../../components/Customer/Login/CustomerLoginGraphql';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [login] = useMutation(LOGIN_MUTATION);

  const handleLogin = async () => {
    try {
      const { data } = await login({
        variables: { email, password },
      });
      // Handle successful login and routing to the dashboard or profile page.
    } catch (error) {
      // Handle login error (e.g., display an error message).
    }
  };

  return (
    <Container maxWidth="xs">
      <div>
        <Typography variant="h5">Login</Typography>
        <form>
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
          <Button variant="contained" color="primary" onClick={handleLogin}>
            Login
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default LoginPage;
