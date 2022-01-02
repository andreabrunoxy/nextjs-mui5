import { useState, useEffect } from 'react';
import Head from 'next/head';
import Products from '../components/Products/Products';
import { commerce } from '../lib/commerce';
import { Container, Typography } from '@mui/material';
import { fontWeight } from '@mui/system';

export async function getStaticProps() {
  const merchant = await commerce.merchants.about();
  const { data: products } = await commerce.products.list();

  return {
    props: {
      merchant,
      products
    }
  };
}

export default function Home({ merchant, products }) {
  const styles = {
    mainTitle: {
      fontWeight: 'bold',
      marginTop: { xs: '20%', sm: '15%', md: '10%' },
      marginLeft: '5%'
    },
    hero: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: '-50px'
    }
  };
  return (
    <div sx={styles.container}>
      <Head>
        <title>My E-Commerce</title>
        <meta name="description" content="E-commerce with Commerce.js and Stripe" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container sx={styles.hero}>
        <Typography variant="h1" sx={styles.mainTitle}>
          My e-Shop
        </Typography>
        <Typography variant="h2">Products for everyone</Typography>
      </Container>
      <Products products={products} />
    </div>
  );
}
