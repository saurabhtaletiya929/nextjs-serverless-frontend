// components/Login.js

import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { Container, Typography, TextField, Button } from '@mui/material';
import { LOGIN_MUTATION } from '../../../../components/Customer/Login/CustomerLoginGraphql';
import { GET_CUSTOMER_DATA } from "~/components/Customer/Login/CustomerDataGraphql";
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '~/providers/context/AuthContext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const [loginMutation] = useMutation(LOGIN_MUTATION);
  const { user, login, logout } = useAuth();

  const handleLogin = async () => {
    try {
      const { data } = await loginMutation({
        variables: { email, password },
      });
      
      if(data?.generateCustomerToken?.token) {
        
        const authToken = data.generateCustomerToken.token;
        login(authToken);
        if (typeof window !== 'undefined') {
          // Perform localStorage action
          const token = localStorage.getItem('token')
          const { loading, error, data } = useQuery(GET_CUSTOMER_DATA);
          //console.log("data", data)
          token ? user() : login(authToken);
          router.push('/customer/account');
        }
        
      } else {
        router.push('/customer/account/login');
      }
      
      // Handle successful login and routing to the dashboard or profile page.
    } catch (error) {
        console.error('Authentication failed', error);
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
          <Button variant="contained" color="primary">
            <Link
                href={{
                pathname: "/customer/account/create",
                query: { type: "CMS" },
                }}
                as={"/customer/account/create"}
            >
                Sign Up
            </Link>
          </Button>
          
        </form>
      </div>
    </Container>
  );
};

export default LoginPage;
