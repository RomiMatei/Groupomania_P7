import { useEffect, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { userActions } from 'features';
// import { UserList } from './userList';
import './usersList.css';
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  Avatar,
  Skeleton
} from '@mui/material';

export { UsersList };

function UsersList() {
  const dispatch = useDispatch();
  const { users } = useSelector((x) => x.users);

  useEffect(() => {
    dispatch(userActions.getAll());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Fragment>
      {users.length && (
        <List
          sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
        >
          {users.map((user) => (
            <ListItem alignItems="flex-start" key={user.id}>
              <ListItemAvatar>
                <Avatar
                  alt="Remy Sharp"
                  src="https://bootdey.com/img/Content/avatar/avatar7.png"
                />
              </ListItemAvatar>
              <ListItemText
                primary={`${user.email}`}
                secondary={
                  <Fragment>
                    <Typography
                      sx={{ display: 'inline' }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      Salut
                    </Typography>
                  </Fragment>
                }
              />
            </ListItem>
          ))}
        </List>
      )}

      {users.loading && (
        <Fragment>
          <Skeleton variant="circular" width={40} height={40} />
          <Skeleton variant="rectangular" width={210} height={60} />
          <Skeleton variant="rounded" width={210} height={60} />{' '}
          <Skeleton variant="circular" width={40} height={40} />
          <Skeleton variant="rectangular" width={210} height={60} />
          <Skeleton variant="rounded" width={210} height={60} />
        </Fragment>
      )}

      {users.error && (
        <Typography variant="text" color="error">
          Erreur de chargement de liste des utilisateurs: {users.error.message}
        </Typography>
      )}
    </Fragment>
  );
}
