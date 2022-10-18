import { forwardRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';

import { messageClear } from 'features';

export { MessageSnackBar };

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function MessageSnackBar(props) {
  const dispatch = useDispatch();
  const snackbarMessage = useSelector((x) => x.messages);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    // Clear global state after show
    dispatch(messageClear());
  };

  return (
    <Snackbar open={snackbarMessage.open} autoHideDuration={6000} onClose={handleClose}>
      <Alert
        onClose={handleClose}
        severity={snackbarMessage.severity}
        sx={{ width: '100%' }}
      >
        {snackbarMessage.message}
      </Alert>
    </Snackbar>
  );
}
