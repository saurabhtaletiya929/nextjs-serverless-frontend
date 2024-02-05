import React from 'react'
import {
    Typography,
    Grid,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
  } from '@mui/material'

export const ColorSizeField = ({ product, selectedColor, handleColorChange, colorError, selectedSize, handleSizeChange, sizeError }) => {
  
    return(
        <Grid container spacing={2}>
            {product.configurable_options.map((attribute) => (
              <Grid item xs={6} key={attribute.id}>
                {/* <Typography>{attribute.label}:</Typography> */}
                <FormControl sx={{ minWidth: 90 }} size="small">
                  <InputLabel id={`${attribute.attribute_code}-label`}>
                    {attribute.label}
                  </InputLabel>
                  <Select
                    labelId={`${attribute.attribute_code}-label`}
                    id={`${attribute.attribute_code}-select`}
                    value={attribute.attribute_code === 'color' ? selectedColor : selectedSize}
                    label={attribute.label}
                    onChange={attribute.attribute_code === 'color' ? handleColorChange : handleSizeChange}
                  >
                    {attribute.values.map((option) => (
                      <MenuItem key={option.value_index} value={option.label}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                {attribute.attribute_code === 'color' && colorError && (
                  <Typography color="error">{colorError}</Typography>
                )}
                {attribute.attribute_code === 'size' && sizeError && (
                  <Typography color="error">{sizeError}</Typography>
                )}
              </Grid>
            ))}
          </Grid>
    )
}