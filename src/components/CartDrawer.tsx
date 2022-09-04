import React, { useState } from 'react';
import {
  Avatar,
  Badge,
  IconButton,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  ListItem,
  List,
  Drawer,
  Box,
  ListItemIcon,
} from '@mui/material';
import { Delete, ShoppingCart } from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../app/store';
import { removeItem } from '../features/counter/cartSlice';

export default function CartDrawer() {
  const { cart } = useSelector((state: RootState) => state);
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const removeFromCart = (name: any) => {
    dispatch(removeItem(name));
    console.log(name);
    // setSuccess(false);
  };

  return (
    <React.Fragment key="right">
      <IconButton
        onClick={() => setIsOpen(true)}
        size="large"
        edge="end"
        color="inherit"
        aria-label="open drawer"
        sx={{ mr: 2 }}>
        <Badge badgeContent={cart.cartItems.length} color="error">
          <ShoppingCart />
        </Badge>
      </IconButton>

      <Drawer anchor="right" open={isOpen} onClose={() => setIsOpen(false)}>
        <Box sx={{ width: 300 }} role="presentation">
          <List>
            {cart.cartItems.map((item) => (
              <ListItem key={item.name} disablePadding>
                <ListItemButton>
                  <ListItemAvatar>
                    <Avatar alt={item.name} src={item.flagURL} />
                  </ListItemAvatar>
                  <ListItemText primary={item.name} />
                  <ListItemIcon>
                    <Delete onClick={() => removeFromCart(item.name)} />
                  </ListItemIcon>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </React.Fragment>
  );
}
