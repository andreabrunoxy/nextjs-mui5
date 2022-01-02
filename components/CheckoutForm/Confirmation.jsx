import React from 'react';
import Link from 'next/link';
import { Button, CircularProgress, Container, Divider, Typography } from '@mui/material';

const Confirmation = ({ order }) => {
  console.log(order);

  return (
    <>
      {order.checkout_token_id && (
        <>
          <Container>
            <Typography variant="h6">
              Thank you for your purchase {order.customer.firstname}{' '}
              {order.customer.lastname}
              <Divider sx={{ marginTop: '2rem', marginBottom: '1rem' }} />
              <Typography variant="subtitle1">
                Order ref: {order.customer_reference}
              </Typography>
            </Typography>
          </Container>
          <br />
          <Link href={'/'} passHref>
            <Button variant="outlined" type="button">
              Back to Home
            </Button>
          </Link>
        </>
      )}
      {/* {isFinished && (
        <>
          <Container>
            <Typography variant="h5">Thank you for your purchase!</Typography>
          </Container>
          <br />
          <Link href={'/'} passHref>
            <Button variant="outlined" type="button">
              Back to Home
            </Button>
          </Link>
        </>
      )} */}
      {!order.checkout_token_id && (
        <Container sx={{ padding: '2rem', display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </Container>
      )}
    </>
  );
};

export default Confirmation;
