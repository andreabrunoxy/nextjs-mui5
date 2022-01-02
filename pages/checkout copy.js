import React, { useState, useEffect } from 'react';
import {
  Paper,
  Stepper,
  Step,
  StepLabel,
  Typography,
  CircularProgress,
  Divider,
  Button,
  Container
} from '@mui/material';
import AddressForm from '../components/CheckoutForm/AddressForm';
import PaymentForm from '../components/CheckoutForm/PaymentForm';
import Confirmation from '../components/CheckoutForm/Confirmation';
import { commerce } from '../lib/commerce';
import { useCartState, useCartDispatch } from '../context/cart';

const steps = ['Shipping Address', 'Payment Details'];

const Checkout = () => {
  const styles = {
    toolbar: {
      marginTop: { xs: '20%', md: '10%' }
    },
    layout: {
      marginTop: '5%',
      width: { xs: '100%', sm: '80%', md: '50%' },
      marginLeft: 'auto',
      marginRight: 'auto'
    },
    paper: {
      padding: '1rem',
      background: '#fbfbfb'
    },
    stepper: {
      padding: '1rem'
    },
    buttonContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: '1rem'
    }
  };
  const cartState = useCartState();

  const [activeStep, setActiveStep] = useState(0);
  const [checkoutToken, setCheckoutToken] = useState(null);
  const [shippingData, setShippingData] = useState({});
  const [order, setOrder] = useState({});
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const generateToken = async () => {
      try {
        const token = await commerce.checkout.generateToken(cartState.id, {
          type: 'cart'
        });
        console.log(token);
        setCheckoutToken(token);
      } catch (error) {}
    };
    generateToken();
  }, [cartState]);

  const { setCart } = useCartDispatch();

  const handleUpdateCart = ({ cartState }) => setCart(cartState);

  const refreshCart = () => {
    commerce.cart.refresh().then(handleUpdateCart);
  };

  const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
    try {
      const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder);
      setOrder(incomingOrder);
      refreshCart();
    } catch (error) {
      console.log(error);
    }
  };

  const nextStep = () => setActiveStep(prevActiveStep => prevActiveStep + 1);
  const backStep = () => setActiveStep(prevActiveStep => prevActiveStep - 1);

  const next = data => {
    setShippingData(data);
    nextStep();
  };

  const timeout = () => {
    setTimeout(() => {
      setIsFinished(true);
    }, 3000);
  };

  const Form = () =>
    activeStep === 0 ? (
      <AddressForm checkoutToken={checkoutToken} next={next} />
    ) : (
      <PaymentForm
        shippingData={shippingData}
        checkoutToken={checkoutToken}
        backStep={backStep}
        nextStep={nextStep}
        onCaptureCheckout={handleCaptureCheckout}
      />
    );

  return (
    <>
      <Container sx={styles.toolbar} />
      <Container sx={styles.layout}>
        <Paper sx={styles.paper}>
          <Typography variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} sx={styles.stepper}>
            {steps.map(step => (
              <Step key={step}>
                <StepLabel>{step}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <Confirmation order={order} />
          ) : (
            checkoutToken && <Form />
          )}
        </Paper>
      </Container>
    </>
  );
};

export default Checkout;
