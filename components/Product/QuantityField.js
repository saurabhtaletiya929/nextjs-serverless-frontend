import React from 'react'
import {
  Typography,
  Box,
  TextField,
} from '@mui/material'

export const QuantityField = ({ quantity, handleQtyChange, error }) => {
  console.log(error, "error");
  return (
    <Box sx={{ m: '30px 0' }}>
      <Typography>Qty</Typography>
      <TextField
        sx={{ minWidth: 10 }}
        size="small"
        value={quantity}
        onChange={(e) => handleQtyChange(e)}
      >
        Qty
      </TextField>
      {error.quantity && <Typography color="error">{error.quantity}</Typography>}
    </Box>
  )
}