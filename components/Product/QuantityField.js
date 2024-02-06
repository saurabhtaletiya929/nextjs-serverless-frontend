import React from 'react'
import {
  Typography,
  Box,
  IconButton,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

export const QuantityField = ({ quantity, handleQtyChange, error }) => {
  return (
    <>
    <Typography variant="body2" sx={{ m: '15px 0 '}}>
        Qty
      </Typography>
    <Box sx={{ m: '10px 0 30px 0', display: 'flex', alignItems: 'center', backgroundColor: 'lightgray', width: '20%' }}>
      <IconButton
        aria-label="decrease quantity"
        onClick={() => handleQtyChange({ target: { value: Math.max(quantity - 1, 1) } })}
        sx={{ p: '8px' }}
      >
        <RemoveIcon />
      </IconButton>
      <Typography variant="body1" component="span">
        {quantity}
      </Typography>
      <IconButton
        aria-label="increase quantity"
        onClick={() => handleQtyChange({ target: { value: quantity + 1 } })}
        sx={{ p: '8px' }}
      >
        <AddIcon />
      </IconButton>
      {error.quantity && (
        <Typography variant="body2" color="error" sx={{ marginLeft: 2 }}>
          {error.quantity}
        </Typography>
      )}
    </Box>
    </>
  );
};
