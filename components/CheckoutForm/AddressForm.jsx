import React, { useState, useEffect } from 'react';
import {
  InputLabel,
  Select,
  MenuItem,
  Button,
  Grid,
  Typography,
  Container
} from '@mui/material';
import { useForm, FormProvider } from 'react-hook-form';
import FormInput from './CustomTextField';
import { commerce } from '../../lib/commerce';

const AddressForm = ({ checkoutToken, next }) => {
  const styles = {
    buttonContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: '1rem'
    }
  };
  const [shippingCountries, setShippingCountries] = useState([]);
  const [shippingCountry, setShippingCountry] = useState('');
  const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
  const [shippingSubdivision, setShippingSubdivision] = useState('');
  const [shippingOptions, setShippingOptions] = useState([]);
  const [shippingOption, setShippingOption] = useState('');

  const methods = useForm();

  const countries = Object.entries(shippingCountries).map(([code, name]) => ({
    id: code,
    label: name
  }));
  // console.log(countries);

  const subdivisions = Object.entries(shippingSubdivisions).map(([code, name]) => ({
    id: code,
    label: name
  }));
  // console.log(subdivisions);

  const options = shippingOptions.map(option => ({
    id: option.id,
    label: `${option.description} - (${option.price.formatted_with_symbol})`
  }));
  // console.log(options);

  const fetchShippingCountries = async checkoutTokenId => {
    const { countries } = await commerce.services.localeListShippingCountries(
      checkoutTokenId
    );
    // console.log(countries);
    setShippingCountries(countries);
    setShippingCountry(Object.keys(countries)[2]);
  };

  const fetchSubdivisions = async countryCode => {
    const { subdivisions } = await commerce.services.localeListSubdivisions(countryCode);
    setShippingSubdivisions(subdivisions);
    setShippingSubdivision(Object.keys(subdivisions)[0]);
  };

  const fetchShippingOptions = async (checkoutTokenId, country, stateProvince = null) => {
    const options = await commerce.checkout.getShippingOptions(checkoutTokenId, {
      country,
      region: stateProvince
    });

    setShippingOptions(options);
    setShippingOption(options[0].id);
  };

  useEffect(() => {
    fetchShippingCountries(checkoutToken.id);
  }, []);

  useEffect(() => {
    if (shippingCountry) fetchSubdivisions(shippingCountry);
  }, [shippingCountry]);

  useEffect(() => {
    if (shippingSubdivision)
      fetchShippingOptions(checkoutToken.id, shippingCountry, shippingSubdivision);
  }, [shippingSubdivision]);

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Shipping Address
      </Typography>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(data =>
            next({ ...data, shippingCountry, shippingSubdivision, shippingOption })
          )}
        >
          <Grid container spacing={3}>
            <FormInput required name="firstName" label="First name" />
            <FormInput required name="lastName" label="Last name" />
            <FormInput required name="address1" label="Address" />
            <FormInput required name="email" label="Email" />
            <FormInput required name="city" label="City" />
            <FormInput required name="ZIP" label="ZIP / Postal Code" />
            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Country</InputLabel>
              <Select
                value={shippingCountry}
                fullWidth
                onChange={e => setShippingCountry(e.target.value)}
              >
                {countries.map(country => (
                  <MenuItem key={country.id} value={country.id}>
                    {country.label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Subdivisions</InputLabel>
              <Select
                value={shippingSubdivision}
                fullWidth
                onChange={e => setShippingSubdivision(e.target.value)}
              >
                {subdivisions.map(subdivision => (
                  <MenuItem key={subdivision.id} value={subdivision.id}>
                    {subdivision.label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Options</InputLabel>
              <Select
                value={shippingOption}
                fullWidth
                onChange={e => setShippingOptions(e.target.value)}
              >
                {options.map(option => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          </Grid>
          <Container sx={styles.buttonContainer}>
            <Button type="button" disabled>
              Prev
            </Button>
            <Button type="submit">Next</Button>
          </Container>
        </form>
      </FormProvider>
    </>
  );
};

export default AddressForm;
