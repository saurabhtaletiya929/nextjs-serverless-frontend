import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  FormGroup,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { Aside } from "~/components/Aside/Aside";
import { useAuth } from "~/providers/context/AuthContext";
import { useMutation } from "@apollo/client";
import { UPDATE_MUTATION } from "~/components/Customer/Update/CustomerUpdateGraphql";

const EditAccount = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("ansar.abbas@systemsltd.com");
  const { setToken, userData, user } = useAuth();
  const [targetValues, setTargetValues] = useState([]);
  const [UpdateCustomer] = useMutation(UPDATE_MUTATION);

  useEffect(() => {
    const resultedToken = localStorage.getItem("token");
    setToken(resultedToken);
    user();
    setFirstName(userData?.customer?.firstname);
    setLastName(userData?.customer?.lastname);
  });

  const ToggleChangeInfo = (e) => {
    const target = e.target.name;
    const isChecked = e.target.checked;
    if (isChecked) {
      setTargetValues([...targetValues, target]);
    } else {
      const newValues = [...targetValues];
      const index = newValues.indexOf(target);
      newValues.splice(index, 1);
      setTargetValues(newValues);
    }
  };

  const updateAccount = () => {
    try {
      const { loading, error, data } = UpdateCustomer({
        variables: { firstName, email },
      });
      console.log(data);
    } catch (error) {}
  };

  return (
    <Grid container spacing={4}>
      <Grid item xs={12} sm={3}>
        <Aside></Aside>
      </Grid>
      {userData && (
        <Grid item xs={12} sm={9}>
          <Typography variant="h5" mb={2}>
            Edit Account Information
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography
                variant="h6"
                borderBottom={1}
                borderColor="#eee"
                padding="0 0 15px"
                margin="0 0 20px"
              >
                Account Information
              </Typography>
              <Box
                component="form"
                sx={{
                  "& > :not(style)": { m: 1, width: "50ch" },
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  required
                  id="filled-required"
                  label="First Name:"
                  defaultValue={`${userData?.customer.firstname}`}
                  variant="outlined"
                  onChange={(e) => setFirstName(e.target.value)}
                />

                <TextField
                  required
                  id="filled-required"
                  label="Last Name:"
                  defaultValue={`${userData?.customer.lastname}`}
                  variant="outlined"
                  onChange={(e) => setLastName(e.target.value)}
                />
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox name="email" />}
                    label="Change Email"
                    onChange={(e) => {
                      ToggleChangeInfo(e);
                    }}
                  />
                  <FormControlLabel
                    control={<Checkbox name="password" />}
                    label="Change Password"
                    onChange={(e) => {
                      ToggleChangeInfo(e);
                    }}
                  />
                </FormGroup>
              </Box>
            </Grid>

            {/* Change Email and Password Block */}
            <Grid item xs={12} sm={6}>
              {targetValues.length > 1 && (
                <Typography
                  variant="h6"
                  borderBottom={1}
                  borderColor="#eee"
                  padding="0 0 15px"
                  margin="0 0 20px"
                >
                  Change Email and Password
                </Typography>
              )}
              {targetValues.length == 1 && (
                <Typography
                  variant="h6"
                  borderBottom={1}
                  borderColor="#eee"
                  padding="0 0 15px"
                  margin="0 0 20px"
                >
                  Change {targetValues[0]}
                </Typography>
              )}
              {targetValues.map((item, key) => {
                return (
                  <>
                    {item == "password" ? (
                      <Box
                        component="form"
                        sx={{
                          "& > :not(style)": { m: 1, width: "50ch" },
                        }}
                        noValidate
                        autoComplete="off"
                      >
                        <TextField
                          hintText="Password"
                          label="Current Password"
                          type="password"
                        ></TextField>
                        <TextField
                          hintText="Password"
                          label="New Password"
                          type="password"
                        ></TextField>
                        <TextField
                          hintText="Password"
                          floatingLabelText="Confirm New Password"
                          type="password"
                        ></TextField>
                      </Box>
                    ) : (
                      <Box
                        component="form"
                        sx={{
                          "& > :not(style)": { m: 1, width: "50ch" },
                        }}
                        noValidate
                        autoComplete="off"
                      >
                        <TextField
                          floatingLabelText="Email"
                          type="email"
                          defaultValue={`${userData?.customer.email}`}
                        ></TextField>
                        <TextField
                          label="Current Password"
                          type="password"
                        ></TextField>
                      </Box>
                    )}
                  </>
                );
              })}
            </Grid>
          </Grid>
          <Button variant="contained" color="primary" onClick={updateAccount}>
            Save
          </Button>
        </Grid>
      )}
    </Grid>
  );
};

export default EditAccount;
