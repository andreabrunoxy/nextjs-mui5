import React from 'react';
import { Grid } from '@mui/material';
import Product from './Product/Product';

const Products = ({ products }) => {
  const styles = {
    grid: {
      display: 'flex',
      marginTop: '3rem',
      padding: '2rem'
    }
  };

  if (!products) return null;

  return (
    <div>
      <Grid sx={styles.grid} container justifyContent="center" spacing={4}>
        {products.map(product => (
          <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
            <Product product={product} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Products;
