import React, { useState } from 'react';
import { Typography, Box, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import styles from './Product.module.css'; 

export const ProductInfo = ({ product }) => {
  const [expandedIndex, setExpandedIndex] = useState(0);

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpandedIndex(isExpanded ? panel : -1);
  };

  return (
    <>
      <Box>
        <Accordion expanded={expandedIndex === 0} onChange={handleAccordionChange(0)} sx={{backgroundColor: '#f8f8f8'}}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="body1" sx={{ fontSize: '15px', fontWeight: '600', marginBottom: '20px' }}>MORE INFORMATION</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box className={styles.information}>
              <Typography className={styles.info}>Style:</Typography>
              <Typography sx={{ fontSize: '15px' }}>{product.style_general}</Typography>
            </Box>
            <Box className={styles.information}>
              <Typography className={styles.info}>Material:</Typography>
              <Typography sx={{ fontSize: '15px' }}>{product.material}</Typography>
            </Box>
            <Box className={styles.information}>
              <Typography className={styles.info}>Pattern:</Typography>
              <Typography sx={{ fontSize: '15px' }}>{product.pattern}</Typography>
            </Box>
            <Box className={styles.information}>
              <Typography className={styles.info}>Climate:</Typography>
              <Typography sx={{ fontSize: '15px' }}>{product.climate}</Typography>
            </Box>
          </AccordionDetails>
        </Accordion>
      </Box>
      <Box>
        <Accordion expanded={expandedIndex === 1} onChange={handleAccordionChange(1)} sx={{backgroundColor: '#f8f8f8'}}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="body1" sx={{ fontSize: '15px', fontWeight: '600', marginBottom: '20px' }}>PRODUCT DESCRIPTION</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {product.description?.html && (
              <div
                className={styles.description}
                dangerouslySetInnerHTML={{ __html: product.description.html }}
              />
            )}
          </AccordionDetails>
        </Accordion>
      </Box>
    </>
  );
};
