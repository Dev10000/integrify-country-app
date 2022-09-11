import React, { useState } from 'react';
import {
  IconButton,
  Box,
  Drawer,
  List,
  Divider,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { Circle, Menu } from '@mui/icons-material';
import PropTypes, { InferProps } from 'prop-types';
import {
  amber,
  blue,
  blueGrey,
  indigo,
  lightGreen,
  pink,
} from '@mui/material/colors';

const colors = {
  'blue[500]': blue[500],
  'pink[500]': pink[500],
  'lightGreen[500]': lightGreen[500],
  'amber[500]': amber[500],
  'blueGrey[800]': blueGrey[800],
  'indigo[900]': indigo[900],
} as const;

type Keys = keyof typeof colors;
// type Values = typeof colors[Keys];

export default function LeftDrawer({
  setColor,
}: InferProps<typeof LeftDrawer.propTypes>) {
  const [isOpen, setState] = useState(false);

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setState(open);
    };

  const list = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}>
      <List>
        {[
          'blue[500]',
          'pink[500]',
          'lightGreen[500]',
          'amber[500]',
          'blueGrey[800]',
          'indigo[900]',
        ].map((text) => (
          <ListItem key={text} disablePadding>
            <Divider />
            <ListItemButton onClick={() => setColor(colors[text as Keys])}>
              <ListItemIcon>
                <Circle sx={{ color: colors[text as Keys] }} />
              </ListItemIcon>
              <ListItemText
                sx={{ color: colors[text as Keys] }}
                primary={text}
              />
            </ListItemButton>
            <Divider />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      <React.Fragment key="left">
        <IconButton
          onClick={toggleDrawer(true)}
          size="large"
          edge="start"
          color="inherit"
          aria-label="open drawer"
          sx={{ mr: 2 }}>
          <Menu />
        </IconButton>

        <Drawer anchor="left" open={isOpen} onClose={toggleDrawer(false)}>
          {list()}
        </Drawer>
      </React.Fragment>
    </div>
  );
}

LeftDrawer.propTypes = {
  setColor: PropTypes.func.isRequired,
};
