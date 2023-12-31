import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Typography, TextField, Button} from '@mui/material';
import { FORGOTPASSWORD_MUTATION } from '~/components/Customer/ForgotPassword/CustomerForgotPasswordGraphql';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const [SendPasswordResetEmail] = useMutation(FORGOTPASSWORD_MUTATION);

  const handleSubmit = async () => {
    try {
      const { data } = await SendPasswordResetEmail({
        variables: { email },
      });
    } catch (error) {
    }
  };
  return (
    <div style={{ margin: "20px 600px" }}>
      <Typography variant='h5' style={{ margin: "30px 0 50px 0"}}>Forgot Your Password?</Typography>
      <Typography>Please enter your email address below to receive a password reset link.</Typography>

      <form>
        <TextField
          label="Email"
          type="email"
          value={email}
          fullWidth
          onChange={(event) => setEmail(event.target.value)}
          required
          style={{ margin: "20px 0" }}
        />
        <Button 
        variant="contained" 
        color="primary"
        onClick={handleSubmit}
        style={{margin: "30px 0"}}>
        Send Email
        </Button>
      </form>
    </div>
  );
};

export default ForgotPassword;