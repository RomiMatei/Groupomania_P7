import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { history } from 'helpers';
import { Login } from 'components/loginRegister/login';

import { Container, Paper, Box } from '@mui/material';

export { LoginPage };

function LoginPage() {
  const authUser = useSelector((x) => x.auth.user);

  useEffect(() => {
    // redirect to home if already logged in
    if (authUser) history.navigate('/');

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
