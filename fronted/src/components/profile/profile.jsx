import { useEffect, useState, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { ProfileEditComponent } from './profile-edit';
import { isEditMode } from 'features';
import './profile.css';
import {
  Button,
  Box,
  Paper,
  Typography,
  Avatar
} from '@mui/material';

export { ProfileComponent };

function ProfileComponent() {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);
  const isEditModeSet = useSelector((state) => state.auth.isEditMode);


  // useEffect(() => {
  //   // checkUserImage();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  // const checkUserImage = () => {
  //   if (!user.image) {
  //     setUserImage('https://bootdey.com/img/Content/avatar/avatar7.png');
  //   }
  //   if (user.image) {
  //     setUserImage(user.image);
  //   }
  // };

  const handleEdit = () => {
    dispatch(isEditMode());
  };

  return (
    <Box className="profileCompo">
      <Paper elevation={3} sx={{ padding: 3 }}>
        <Typography variant="h1" gutterBottom className="profileTitle">
          Mon Profile
        </Typography>
        {!isEditModeSet && (
          <Fragment>
            <Avatar
              aria-label="recipe"
              className="userAvatar"
              src={user.image}
              alt={user.email}
            ></Avatar>
            <Typography variant="subtitle1" gutterBottom>
              {user.email}
            </Typography>
            <Button variant="text" onClick={handleEdit}>
              Editer Mon Profile
            </Button>
          </Fragment>
        )}

        {isEditModeSet && (
          <ProfileEditComponent/>
        )}
      </Paper>
    </Box>
  );
}
