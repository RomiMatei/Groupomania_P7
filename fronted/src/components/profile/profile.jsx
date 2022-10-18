import { useEffect, useState, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';

import { ProfileEditComponent } from './profile-edit';
// import { postAll } from '../../features/posts/posts.actions';
import './profile.css';
import {
  Button,
  Grid,
  Input,
  Box,
  Paper,
  Typography,
  TextField,
  IconButton,
  Avatar
} from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';

export { ProfileComponent };

function ProfileComponent() {
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const user = useSelector((state) => state.auth.user);
  const [userImage, setUserImage] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [formImage, setFormImage] = useState(userImage);
  const [formMail, setFormMail] = useState(user.email);

  useEffect(() => {
    checkUserImage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkUserImage = () => {
    if (!user.image) {
      setUserImage('https://bootdey.com/img/Content/avatar/avatar7.png');
    }
  };

  const handleEdit = () => {
    setIsEdit(true);
  };

  return (
    <Box className="profileCompo">
      <Paper elevation={3} sx={{ padding: 3 }}>
        <Typography variant="h1" gutterBottom className="profileTitle">
          Mon Profile
        </Typography>
        {!isEdit && (
          <Fragment>
            <Avatar
              aria-label="recipe"
              className="userAvatar"
              src={userImage}
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

        {isEdit && (
          <ProfileEditComponent/>
        )}
      </Paper>
    </Box>
  );
}
