import React, { useEffect } from "react";
import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Aside } from "~/components/Aside/Aside";
import { useAuth } from "~/providers/context/AuthContext";

const MyOrders = () => {
  const { token, setToken, userData, user } = useAuth();
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
            My Orders
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Order # </TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>ship To</TableCell>
                  <TableCell>Order Total</TableCell>
                  <TableCell>Order Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {userData?.customerOrders.items.map((order, key) => {
                  return (
                    <TableRow>
                      <TableCell>{order.order_number}</TableCell>
                      <TableCell>{order.created_at}</TableCell>
                      <TableCell>
                        {userData.customer.firstname}{" "}
                        {userData.customer.lastname}
                      </TableCell>
                      <TableCell>{order.grand_total}</TableCell>
                      <TableCell>{order.status}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      )}
    </Grid>
  );
};

export default MyOrders;
