// components/Registration.js

import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import {
  Container,
  Typography,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  Alert,
} from "@mui/material";
import { CREATE_CUSTOMER_MUTATION } from "../../../../components/Customer/Create/CustomerCreateGraphql";
import { useRouter } from "next/router";
const Registration = () => {
  const router = useRouter();
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [showError, setShowError] = useState("");
  const [passwordFieldType, setPasswordFieldType] = useState({
    type: "password",
  });

  const [createCustomer] = useMutation(CREATE_CUSTOMER_MUTATION);

  const toggleShowPassword = (e) => {
    const isChecked = e.target.checked;
    if (isChecked) {
      setPasswordFieldType({ type: "text" });
    } else {
      setPasswordFieldType({ type: "password" });
    }
  };
  const handleRegistration = async () => {
    if (password === rePassword) {
      try {
        const { error, data } = await createCustomer({
          variables: { firstname, lastname, email, password },
        });
        if (error) setShowError(error);
        if (data)
          router.push({
            pathname: "/customer/account/login",
            query: { name: "Someone" },
          });
      } catch (error) {
        setShowError(error);
        // Handle registration error (e.g., display an error message).
      }
    } else {
      setShowError("Please enter the same password again");
    }
  };

  return (
    <Container maxWidth="sm">
      <div>
        <Typography variant="h5">Create New Customer Account</Typography>
        <form style={{ display: "flex", flexDirection: "column" }}>
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
            type={passwordFieldType.type}
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            label="Confirm Password"
            type={passwordFieldType.type}
            variant="outlined"
            fullWidth
            margin="normal"
            value={rePassword}
            onChange={(e) => setRePassword(e.target.value)}
          />
          {showError && <Alert severity="error">{showError}</Alert>}
          <FormControlLabel
            control={<Checkbox name="showPassword" />}
            label="Show Password"
            onChange={(e) => {
              toggleShowPassword(e);
            }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleRegistration}
          >
            Create
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default Registration;
