import React, { useState, useEffect } from 'react';
import { Typography, Dialog, DialogTitle, DialogContent, DialogActions, Button, Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';
import Chart from 'chart.js/auto';
import womenTop from 'public/static/womenTop.png';
import womenPant from 'public/static/womenJean.png';
import menTop from 'public/static/menTop.png';
import menPant from 'public/static/menPant.png';


const womenTopData = {
  labels: ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'],
  bust: [43, 45, 47, 49, 51, 53, 55],
  acrossshoulder: [8.25, 8.5, 8.75, 9, 9.25, 9.5, 9.75],
  length: [19, 19.5, 20, 20.5, 21, 21.5, 22]
};

const womenBottomData = {
  labels: ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'],
  waist: [24, 26, 28, 30, 32, 34, 36],
  outseamLength: [40.5, 41, 41.5, 42, 42.5, 43, 43.5]
};

const menTopData = {
  labels: ['S', 'M', 'L', 'XL', '2XL', '3XL'],
  chest: [42, 44, 46, 48, 50, 52],
  acrossshoulder: [29, 29.75, 30.5, 31.25, 32, 32.75],
  length: [9.75, 10, 10.25, 10.5, 10.75, 11]
};

const menBottomData = {
    labels: ['S', 'M', 'L', 'XL', '2XL', '3XL'],
  waist: [27, 29, 31, 33, 35, 37],
  outseamLength: [40, 40.5, 40.5, 41, 41.5, 42]
};

const sizeGuideData = {
    "Women's Top": { data: womenTopData, image: womenTop },
    "Women's Bottom": { data: womenBottomData, image: womenPant },
    "Men's Top": { data: menTopData, image: menTop },
    "Men's Bottom": { data: menBottomData, image: menPant }
  };
  
  
  export const SizeGuide = ({categories}) => {
    const [open, setOpen] = useState(false);
    const [selectedProductType, setSelectedProductType] = useState('');
    const [selectedData, setSelectedData] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
  
    const handleSizeGuideClick = (productType) => {
      setSelectedProductType(productType);
      setSelectedData(sizeGuideData[productType].data);
      setSelectedImage(sizeGuideData[productType].image);
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    const renderTable = () => {
      if (!selectedData) return null;
  
      return (
        <Table>
          <TableHead>
            <TableRow>
              {Object.keys(selectedData).map((key) => (
                <TableCell key={key}>{key}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {selectedData.labels.map((label, index) => (
              <TableRow key={label}>
                {Object.keys(selectedData).map((key) => (
                  <TableCell key={key}>{selectedData[key][index]}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      );
    };
  
    return (
      <div>
        {Object.keys(sizeGuideData).map((category) => (
          <Typography key={category} variant="body1" onClick={() => handleSizeGuideClick(category)}>
            {category} Size Guide
          </Typography>
        ))}
  
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>{selectedProductType} Size Guide</DialogTitle>
          <DialogContent>
            <img src={selectedImage} alt={selectedProductType} style={{ width: '100%', height: 'auto' }} />
            {renderTable()}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Close</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  };