import React from 'react';
import PropTypes, { InferProps } from 'prop-types';
import { Check } from '@mui/icons-material';
import { Box, Fab } from '@mui/material';
import { green } from '@mui/material/colors';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, removeItem } from '../features/cartSlice';
import { AppDispatch, RootState } from '../app/store';

function UsersActions({
  params,
}: /*   rowId,
  setRowId, */
InferProps<typeof UsersActions.propTypes>) {
  const { cart } = useSelector((state: RootState) => state);
  // const [loading, setLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const itemExistsInCart = () => {
    if (cart.cartItems.some((item) => params.row.name === item.name))
      return true;
    return false;
  };

  const addToCart = () => {
    // setLoading(true);
    const { name, flagURL } = params.row;
    dispatch(addItem({ name: name, flagURL: flagURL }));
    // setLoading(false);
  };

  const removeFromCart = () => {
    dispatch(removeItem(params.row.name));
  };

  return (
    <Box sx={{ m: 1, position: 'relative' }}>
      {itemExistsInCart() ? (
        <Fab
          color="primary"
          sx={{
            width: 40,
            height: 40,
            bgcolor: green[500],
            '&:hover': { bgcolor: green[700] },
          }}
          onClick={removeFromCart}>
          <Check />
        </Fab>
      ) : (
        <Fab
          color="primary"
          sx={{
            width: 40,
            height: 40,
          }}
          // disabled={params.id !== rowId}
          onClick={addToCart}>
          <Check />
        </Fab>
      )}
    </Box>
  );
}

// Note! To have nullable proptype you need to take off "isRequired" and
// add defaultProps "null", see below "rowId" for example

/* UsersActions.defaultProps = {
  rowId: null,
}; */

UsersActions.propTypes = {
  params: PropTypes.shape({
    row: PropTypes.shape({
      flagURL: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  // rowId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  // setRowId: PropTypes.func.isRequired,
};

export default UsersActions;
