import React from 'react'
import {
    Typography,
    Box,
    TextField,
  } from '@mui/material'

export const QuantityField = ({ quantity, handleQtyChange, quantityError }) => {
    return(
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
            {quantityError && <Typography color="error">{quantityError}</Typography>}
          </Box>
    )
}