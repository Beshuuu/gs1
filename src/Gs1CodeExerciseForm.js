import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import React, { useState } from "react";
import { isGtinInvalid, isProductNameInvalid, isProductDescriptionInvalid, isBrandInvalid } from "./Validate.js"
import { useNavigate } from 'react-router-dom';

const defaultValue = { value: "", touched: false, error: false };

const Gs1CodeExerciseForm = () => {
  const [gtin, setGtinValue] = useState(defaultValue);
  const [productName, setProductNameValue] = useState(defaultValue);
  const [productDescription, setProductDescriptionValue] = useState(defaultValue);
  const [brand, setBrandValue] = useState(defaultValue);
  const [submitting, setSubmissionStatus] = useState(false);

  const onChangeGtin = (e) => setGtinValue({
    value: e.target.value,
    touched: e.target.value ? true : false,
    error: isGtinInvalid(e.target.value)
  });

  const onChangeProductName = (e) => setProductNameValue({
    value: e.target.value,
    touched: true,
    error: isProductNameInvalid(e.target.value)
  });

  const onChangeProductDescription = (e) => setProductDescriptionValue({
    value: e.target.value,
    touched: true,
    error: isProductDescriptionInvalid(e.target.value)
  });

  const onChangeBrand = (e) => setBrandValue({
    value: e.target.value,
    touched: true,
    error: isBrandInvalid(e.target.value, productName)
  });

  const tradeDescription = `${brand.value.trim()} ${productName.value.trim()}`;
  let navigate = useNavigate();

  const isFormIncomplete = [gtin, productName, productDescription, brand].some(field => field.touched === false);
  const formErrorsExist = [gtin, productName, productDescription, brand].some(field => field.error === true);

  return (
    <Container>
      <h2>GS1 Code Exercise</h2>
      <Stack spacing={2}>
        <TextField
          onChange={onChangeGtin}
          value={gtin.value}
          label="GTIN"
          error={gtin.error || (submitting && !gtin.touched)}
          inputProps={{
            maxLength: 14,
          }}
          helperText="Please enter a valid GTIN"
        />
        <TextField
          onChange={onChangeProductName}
          value={productName.value}
          label="Product Name"
          inputProps={{
            maxLength: 99,
          }}
          error={productName.error || (submitting && !productName.touched)}
          helperText="Must be less than 100 characters"
        />
        <TextField
          onChange={onChangeProductDescription}
          value={productDescription.value}
          label="Product Description"
          inputProps={{
            maxLength: 254,
          }}
          error={productDescription.error || (submitting && !productDescription.touched)}
          helperText="Must containt at least two words and less than 255 characters"
        />
        <TextField
          onChange={onChangeBrand}
          value={brand.value}
          label="Brand"
          error={brand.error || (submitting && !brand.touched)}
          helperText="Cannot be the same as product name"
        />
        <div><strong>Trade Description: </strong><span>{tradeDescription}</span></div>
        <br />
        <Button variant="contained" onClick={
          () => {
            setSubmissionStatus(true);
            if (isFormIncomplete || formErrorsExist) { return; }
            navigate('/success', { state: { gtin, productName, productDescription, brand, tradeDescription } })
          }
        }>
          Submit
        </Button>
      </Stack>
    </Container>
  );
};

export default Gs1CodeExerciseForm;