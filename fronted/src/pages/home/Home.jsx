import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { userActions, postsActions } from 'features';
import { UsersList } from 'components/usersList/usersList';
import { PostsList } from 'components/posts/posts';
import { Container, Grid } from '@mui/material';

export { Home };

function Home() {
  const dispatch = useDispatch();
  const { user: authUser } = useSelector((x) => x.auth);
  //   const { users } = useSelector((x) => x.users);
  //   console.log(useSelector((x) => x.users));

  useEffect(() => {
    dispatch(userActions.getAll());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container maxWidth="md" sx={{mt: 3}}>
      <Grid container spacing={3}>
        <Grid item xs={false} md={4}>
          <UsersList />
        </Grid>
        <Grid item xs={12} md={8}>
          <PostsList />
        </Grid>
      </Grid>

      {/* {users.length &&
                <ul>
                    {users.map(user =>
                        <li key={user.id}>{user.last_name} {user.name}</li>
                    )}
                </ul>
            }
            {users.loading && <div className="spinner-border spinner-border-sm"></div>}
            {users.error && <div className="text-danger">Erreur de chargement de liste des utilisateurs: {users.error.message}</div>} */}
    </Container>
  );
}
