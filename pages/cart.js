import React, { useState } from 'react';
import Link from 'next/link';
import {
  Container,
  Typography,
  Button,
  Grid,
  CircularProgress,
  Box
} from '@mui/material';
import { useCartState, useCartDispatch } from '../context/cart';
import CartItem from '../components/CartItem/CartItem';
import { commerce } from '../lib/commerce';

const Cart = () => {
  const styles = {
    title: {
      marginTop: { xs: '20%', sm: '10%' },
      marginRight: 'auto',
      marginLeft: 'auto',
      fontWeight: 'bold'
    },
    subtitle: {
      marginTop: '3rem',
      marginLeft: 'auto',
      marginRight: 'auto',
      fontSize: '1.5rem'
    },
    cardDetails: {
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column',
      marginTop: '1rem',
      marginBottom: '2rem',
      width: '100%',
      fontSize: { md: '2rem' }
    },
    price: {
      justifyContent: 'start'
    },
    container: {
      marginTop: '1rem',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    subtotal: {
      fontWeight: 'bold',
      marginRight: '20px',
      marginBottom: { xs: '1rem', sm: '0' }
    },
    button: {
      minWidth: '150px',
      marginRight: '20px'
    },
    checkout: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'flex-end',
      alignItems: 'center',
      marginTop: '3rem',
      marginBottom: '3rem'
    }
  };

  const cartState = useCartState();

  const isEmpty = cartState.line_items.length === 0;

  console.log(cartState);

  const EmptyCart = () => {
    return (
      <>
        <Typography variant="subtitle1" sx={styles.subtitle}>
          You have no items in your shopping cart.
        </Typography>
      </>
    );
  };

  const FilledCart = () => {
    return (
      <>
        <Grid container spacing={3} sx={styles.cardDetails}>
          {cartState.line_items.map(item => (
            <Grid item key={item.id}>
              <CartItem item={item} />
            </Grid>
          ))}
        </Grid>
        <hr />
        <Grid item sx={styles.checkout}>
          <Typography variant="h4" sx={styles.subtotal}>
            Subtotal: {cartState.subtotal.formatted_with_symbol}
          </Typography>
          <Button
            size="large"
            type="button"
            variant="contained"
            color="secondary"
            sx={styles.button}
            onClick={emptyCart}
          >
            Empty Cart
          </Button>
          <Link href="/checkout" passHref>
            <Button
              size="large"
              type="button"
              variant="contained"
              color="primary"
              sx={styles.button}
            >
              Checkout
            </Button>
          </Link>
        </Grid>
      </>
    );
  };

  const { setCart } = useCartDispatch();

  const handleUpdateCart = ({ cart }) => setCart(cart);

  const emptyCart = () => {
    commerce.cart.empty().then(handleUpdateCart);
  };

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <div />
      <Typography sx={styles.title} variant="h4" component="h2">
        Your Shopping Cart
      </Typography>
      {!cartState.id && (
        <Box style={{ fontWeight: 'bold', marginTop: '2rem' }}>
          <CircularProgress />
        </Box>
      )}
      {cartState.id && !isEmpty && <FilledCart />}
      {cartState.id && isEmpty && <EmptyCart />}
    </Container>
  );
};

export default Cart;
