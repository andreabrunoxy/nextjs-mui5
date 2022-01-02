import React from 'react';
import {
  Typography,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container
} from '@mui/material';
import { useCartDispatch } from '../../context/cart';
import { commerce } from '../../lib/commerce';

const CartItem = ({ item }) => {
  const styles = {
    cardMedia: {
      width: { sm: '100%', md: '50%' },
      padding: '10px'
    },
    cardContent: {
      display: 'flex',
      flexDirection: { xs: 'column', md: 'row' },
      alignItems: 'center'
    },
    cardInfo: {
      display: 'flex',
      alignItems: 'center'
    },
    cardName: {
      marginRight: '2rem'
    },
    buttons: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }
  };

  const { setCart } = useCartDispatch();

  const handleUpdateCart = ({ cart }) => setCart(cart);

  const removeItem = () => {
    commerce.cart.remove(item.id).then(handleUpdateCart);
  };

  const decrementQuantity = () => {
    item.quantity > 1
      ? commerce.cart
          .update(item.id, { quantity: item.quantity - 1 })
          .then(handleUpdateCart)
      : removeItem();
  };

  const incrementQuantity = () => {
    commerce.cart.update(item.id, { quantity: item.quantity + 1 }).then(handleUpdateCart);
  };

  return (
    <>
      <Card>
        <Box sx={styles.cardContent}>
          <CardMedia
            component="img"
            image={item.image.url}
            title={item.name}
            height="300"
            alt={item.name}
            sx={styles.cardMedia}
          />
          <CardContent sx={styles.cardInfo}>
            <Typography variant="h4" sx={styles.cardName}>
              {item.name}
            </Typography>
            <Typography variant="h5">{item.line_total.formatted_with_symbol}</Typography>
          </CardContent>
          <Container></Container>
          <CardActions>
            <Typography>Q.ty:</Typography>
            <Button type="button" size="small" onClick={decrementQuantity}>
              -
            </Button>
            <Typography>{item.quantity}</Typography>
            <Button type="button" size="small" onClick={incrementQuantity}>
              +
            </Button>
            <Button
              variant="contained"
              type="button"
              color="secondary"
              onClick={removeItem}
            >
              Remove
            </Button>
          </CardActions>
        </Box>
      </Card>
    </>
  );
};

export default CartItem;
