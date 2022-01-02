import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import logo from '../../public/images/myshop.png';

import { AppBar, Toolbar, Typography, Badge, IconButton } from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';
import { useCartState } from '../../context/cart';

const Navbar = () => {
  const cartState = useCartState();

  const styles = {
    appBar: {
      boxShadow: 'none',
      borderBottom: '1px solid rgba(0, 0, 0, 0.12)'
    },
    title: {
      flexGrow: 1,
      alignItems: 'center',
      display: 'flex',
      textDecoration: 'none',
      marginLeft: '10px',
      cursor: 'pointer'
    }
  };

  return (
    <>
      <AppBar sx={styles.appbar} position="fixed">
        <Toolbar>
          <Image
            sx={styles.image}
            src={logo}
            alt="Commerce.js"
            height="45px"
            width="45px"
          />
          <Link href={'/'} passHref>
            <Typography sx={styles.title} variant="h6" color="inherit">
              My e-Shop
            </Typography>
          </Link>
          <Link href={'/cart'} passHref>
            <IconButton aria-label="Show cart items" color="inherit">
              <Badge badgeContent={cartState.total_items} color="secondary">
                <ShoppingCart />
              </Badge>
            </IconButton>
          </Link>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
