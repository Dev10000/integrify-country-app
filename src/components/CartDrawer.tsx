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
} from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';

export default function CartDrawer() {
  const { cart } = useSelector((state: RootState) => state);
  const [isOpen, setIsOpen] = useState(false);

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
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </React.Fragment>
  );
}
