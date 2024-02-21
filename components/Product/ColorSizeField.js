import React from 'react';
import {
  Typography,
  Button,
  ButtonGroup,
  Box,
} from '@mui/material';
import { SizeGuide } from './SizeGuide';

const ColorField = ({
  attribute,
  selectedColor,
  handleColorChange,
  colorError,
}) => (
  <Box key={attribute.id} sx={{display: 'flex', alignItems: 'center'}}>
    <Typography sx={{ m: '10px 0', color: '#777' }}>{attribute.label}:</Typography>
    <ButtonGroup aria-label={attribute.label} sx={{m: '0 20px'}}>
      {attribute.values.map((option) => (
        <Box
          key={option.value_index}
          // variant={selectedColor === option.label ? 'black' : 'outlined'}
          onClick={() => handleColorChange({ target: { value: option.label } })}
          style={{ textTransform: 'none', margin: '4px', borderRadius: selectedColor === option.label ? '50px' : '4px' }}
        >
          <div
            style={{
              width: '45px',
              height: '45px',
              background: option.swatch_data.value,
              boxShadow: selectedColor === option.label ? '0 0 0 2px #ccccccc2' : 'none',
              // border: selectedColor === option.label ? '4px solid #ccccccc2' : '2px solid transparent',
              // borderRadius: '50%',
              marginRight: '8px',
              cursor: 'pointer',
            }}
          ></div>
          {/* {option.label} */}
        </Box>
      ))}
    </ButtonGroup>
    {colorError && (
      <Typography color="error">{colorError}</Typography>
    )}
  </Box>
);

const SizeField = ({
  attribute,
  selectedSize,
  handleSizeChange,
  sizeError,
  categories
}) => (
  <Box key={attribute.id} sx={{display: 'flex', m: '20px 0', alignItems: 'center'}}>
    <Typography sx={{ m: '10px 0', color: '#777' }}>{attribute.label}:</Typography>
    <ButtonGroup variant="outlined" color="primary" aria-label={attribute.label} sx={{m: '0 27px'}}>
      {attribute.values.map((option) => (
        <Box
          key={option.value_index}
          variant={selectedSize === option.label ? 'contained' : 'outlined'}
          onClick={() => handleSizeChange({ target: { value: option.label } })}
          style={{ textTransform: 'none', margin: '4px', borderRadius: selectedSize === option.label ? '50px' : '4px' }}
        // style={{ textTransform: 'none', margin: '4px' }}
        >
          <div
            style={{
              width: '45px',
              height: '45px',
              background: option.swatch_data.value,
              boxShadow: selectedSize === option.label ? '0 0 0 2px black' : '0 0 0 1px #ccccccc2',
              // border: selectedSize === option.label ? '4px solid #80808040' : '2px solid black',
              // borderRadius: '50%',
              marginRight: '8px',
              cursor: 'pointer',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              color: '#777',
            }}
          >
            {option.label}
          </div>
        </Box>
      ))}
    </ButtonGroup>
    <SizeGuide categories={categories} />
    {sizeError && (
      <Typography color="error">{sizeError}</Typography>
    )}
  </Box>
);

export const ColorSizeField = ({
  product,
  selectedColor,
  handleColorChange,
  colorError,
  selectedSize,
  handleSizeChange,
  sizeError,
  categories
}) => (
  <>
    {product.configurable_options?.map((attribute) => (
      <div key={attribute.id}>
        {attribute.attribute_code === 'color' && (
          <ColorField
            attribute={attribute}
            selectedColor={selectedColor}
            handleColorChange={handleColorChange}
            colorError={colorError}
          />
        )}
        {attribute.attribute_code === 'size' && (
          <SizeField
            attribute={attribute}
            selectedSize={selectedSize}
            handleSizeChange={handleSizeChange}
            sizeError={sizeError}
            categories={categories}
          />
        )}
      </div>
    ))}
  </>
);
