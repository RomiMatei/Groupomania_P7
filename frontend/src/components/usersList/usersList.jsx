import { useEffect, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getAllUsers } from 'features';

import {
  Card,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  Avatar,
  Skeleton
} from '@mui/material';
import './usersList.css';

export { UsersList };

function UsersList() {
  const dispatch = useDispatch();
  const { usersList, loading, error } = useSelector((x) => x.users);

  useEffect(() => {
    dispatch(getAllUsers());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Fragment>
      {usersList.length && (
        <Card>
          <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
            {usersList.map((user) => (
              <ListItem alignItems="flex-start" key={user.id}>
                <ListItemAvatar>
                  <Avatar
                    alt={user.email}
                    src={user.image}
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
        </Card>
      )}

      {loading && (
        <Fragment>
          <Skeleton variant="circular" width={40} height={40} />
          <Skeleton variant="rectangular" width={210} height={60} />
          <Skeleton variant="rounded" width={210} height={60} />{' '}
          <Skeleton variant="circular" width={40} height={40} />
          <Skeleton variant="rectangular" width={210} height={60} />
          <Skeleton variant="rounded" width={210} height={60} />
        </Fragment>
      )}

      {error && (
        <Typography variant="text" color="error">
          Erreur de chargement de liste des utilisateurs: {error.message}
        </Typography>
      )}
    </Fragment>
  );
}
