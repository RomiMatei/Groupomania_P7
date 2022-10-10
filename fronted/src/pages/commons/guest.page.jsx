import { useEffect, useState, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { history } from 'helpers';
import { Login } from 'components/loginRegister';
import { SignUp } from 'components/loginRegister';

import { Container, Paper, Box, Link } from '@mui/material';

export { GuestPage };

function userLogin(props) {
  return (
    <Container component="main" maxWidth="xs">
      <Paper>
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <img src="/groupomania.svg" width={200} alt="Logo" />
          <Login />
        </Box>
      </Paper>
    </Container>
  );
}

function userSignUp(props) {
  return (
    <Container component="main" maxWidth="xs">
      <Paper>
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <img src="/groupomania.svg" width={200} alt="Logo" />
          <SignUp />
        </Box>
      </Paper>
    </Container>
  );
}

function GuestPage() {
  // const dispatch = useDispatch();
  const authUser = useSelector((x) => x.auth.user);
  // const authError = useSelector((x) => x.auth.error);
  const [register, setRegister] = useState(false);

  useEffect(() => {
    // redirect to home if already logged in
    if (authUser) history.navigate('/');

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function registerUser() {
    if (register === false) {
      setRegister(true);
    } else {
      setRegister(false);
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <Paper>
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <img src="/groupomania.svg" width={200} alt="Logo" />
          {register ? (
            <Fragment>
              <SignUp />
              <Link href="#" onClick={registerUser} variant="body2">
                {'Se Connecter'}
              </Link>
            </Fragment>
          ) : (
            <Fragment>
              <Login />
              <Link href="#" onClick={registerUser} variant="body2">
                {'Créer un compte'}
              </Link>
            </Fragment>
          )}
        </Box>
      </Paper>
    </Container>
  );
}
