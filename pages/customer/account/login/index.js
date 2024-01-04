// components/Login.js

import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { Typography, TextField, Button, Grid } from '@mui/material';
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
        router.push('/customer/account');
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
    <div>
      <Typography variant="h5" style={{margin: "20px 450px"}}>Customer Login</Typography>
      <Grid container maxWidth="xs" spacing={2} style={{margin: "20px 450px"}}>
        <Grid>
        <Typography style={{margin: "20px 0"}}>Registered Customers</Typography>
        <Typography>If you have an account, sign in with your email address.</Typography>
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
          <Typography>
            <Link
            href={{
              pathname: "/customer/account/forgotpassword",
              query: { type: "CMS" },
              }}
              as={"/customer/account/forgotpassword"}
              >
              Forgot Your Password?
            </Link>
            </Typography>
          <Button variant="contained" color="primary" onClick={handleLogin}>
            Login
          </Button>
        </form>
      </Grid>
      <Grid item xs={6} style={{margin: "0 auto"}}>
        <Typography>New Customers</Typography>
        <Typography style={{margin: "20px 0"}}>Creating an account has many benefits: check out faster, <br></br> keep more than one address, track orders and more.</Typography>
        <Button variant="contained" color="primary">
            <Link
            style={{textDecoration: "none", color: "white"}}
                href={{
                pathname: "/customer/account/create",
                query: { type: "CMS" },
                }}
                as={"/customer/account/create"}
            >
                Sign Up
            </Link>
          </Button>
      </Grid>
      </Grid>
      </div>
  );
};

export default LoginPage;
