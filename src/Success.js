import React from "react";
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import { useLocation } from 'react-router-dom';

const Success = () => {
  const location = useLocation();
  const { gtin, productName, productDescription, brand, tradeDescription } = location.state;
  
  return (
    <Container>
      <h2>Success</h2>
      <Card variant="outlined">
        <Stack spacing={2}>
          <div><strong>GTIN: </strong><span>{gtin.value}</span></div>
          <div><strong>Product Name: </strong><span>{productName.value.trim()}</span></div>
          <div><strong>Product Description: </strong><span>{productDescription.value.trim()}</span></div>
          <div><strong>Brand: </strong><span>{brand.value.trim()}</span></div>
          <div><strong>Trade Description: </strong><span>{tradeDescription}</span></div>
        </Stack>
      </Card>
    </Container>
  );
};

export default Success;