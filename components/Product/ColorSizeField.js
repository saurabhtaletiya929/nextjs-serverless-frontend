import React from 'react';
import {
  Typography,
  Button,
  ButtonGroup,
} from '@mui/material';

export const ColorSizeField = ({
  product,
  selectedColor,
  handleColorChange,
  colorError,
  selectedSize,
  handleSizeChange,
  sizeError,
}) => {
  return (
    <>
      {product.configurable_options.map((attribute) => (
        <div key={attribute.id}>
          <Typography sx={{m: '10px 0'}}>{attribute.label}</Typography>
          <ButtonGroup variant="outlined" color="primary" aria-label={attribute.label}>
            {attribute.values.map((option) => (
              <Button
                key={option.value_index}
                variant={attribute.attribute_code === 'color' ? (selectedColor === option.label ? 'contained' : 'outlined') : (selectedSize === option.label ? 'contained' : 'outlined')}
                onClick={attribute.attribute_code === 'color' ? () => handleColorChange({ target: { value: option.label } }) : () => handleSizeChange({ target: { value: option.label } })}
                style={{ textTransform: 'none', margin: '4px' }}
              >
                {attribute.attribute_code === 'color' ? (
                  <div
                    style={{
                      width: '20px',
                      height: '20px',
                      background: option.swatch_data.value,
                      borderRadius: '50%',
                      marginRight: '8px',
                    }}
                  ></div>
                ) : null}
                {option.label}
              </Button>
            ))}
          </ButtonGroup>
          {attribute.attribute_code === 'color' && colorError && (
            <Typography color="error">{colorError}</Typography>
          )}
          {attribute.attribute_code === 'size' && sizeError && (
            <Typography color="error">{sizeError}</Typography>
          )}
        </div>
      ))}
    </>
  );
};
