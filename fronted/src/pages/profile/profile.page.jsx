import { UsersList } from 'components/usersList/usersList';
import { ProfileComponent } from 'components/profile/profile';
import { Container, Grid } from '@mui/material';

export { Profile };

function Profile() {
  return (
    <Container maxWidth="md" sx={{ mt: 3 }}>
      <Grid container spacing={3}>
        <Grid item xs={false} md={4}>
          <UsersList />
        </Grid>
        <Grid item xs={12} md={8}>
          <ProfileComponent />
        </Grid>
      </Grid>
    </Container>
  );
}
