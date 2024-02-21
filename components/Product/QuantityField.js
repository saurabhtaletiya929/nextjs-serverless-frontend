import React from 'react';
import {
  Typography,
  Box,
  IconButton,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

export const QuantityField = ({ quantity, handleQtyChange, error }) => {
  return (
    <Box sx={{display: 'flex', m: '25px 0', alignItems: 'center'}}>
      <Typography sx={{ marginBottom: '10px', color: '#777' }}>
        Qty:
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center',justifyContent: 'center', border: '1px solid #ccc', p: '2px',m: '0 35px', width: '16%' }}>
        <IconButton
          aria-label="decrease quantity"
          onClick={() => handleQtyChange({ target: { value: Math.max(quantity - 1, 1) } })}
        >
          <RemoveIcon />
        </IconButton>
        <Typography variant="body1" component="span" sx={{p: '0 10px', color: '#777'}}>
          {quantity}
        </Typography>
        <IconButton
          aria-label="increase quantity"
          onClick={() => handleQtyChange({ target: { value: quantity + 1 } })}
        >
          <AddIcon />
        </IconButton>
      </Box>
      {error.quantity && (
        <Typography variant="body2" color="error" sx={{ marginTop: 2 }}>
          {error.quantity}
        </Typography>
      )}
    </Box>
  );
};
