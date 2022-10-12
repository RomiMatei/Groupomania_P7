import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { userActions, postsActions } from 'features';
import { UsersList } from 'components/usersList/usersList';
import { ProfileComponent } from 'components/profile/profile';
import { Container, Grid } from '@mui/material';

export { Profile };

function Profile() {
  const dispatch = useDispatch();
  // const { user: authUser } = useSelector((x) => x.auth);

  // useEffect(() => {
  //   dispatch(userActions.getAll());

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  return (
    <Container maxWidth="md" sx={{mt: 3}}>
      <Grid container spacing={3}>
        <Grid item xs={false} md={4}>
          <UsersList />
        </Grid>
        <Grid item xs={12} md={8}>
          <ProfileComponent/>
        </Grid>
      </Grid>
    </Container>
  );
}
