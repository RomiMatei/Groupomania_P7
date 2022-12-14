import { useEffect, useState, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { profilEdit } from 'features';
// import { postAll } from '../../features/posts/posts.actions';
import './profile.css';
import {
  Button,
  Grid,
  Box,
  Typography,
  TextField,
  Avatar
} from '@mui/material';
import { Save } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';

export { ProfileEditComponent };

function ProfileEditComponent() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [formImage, setFormImage] = useState(null);
  const [formImagePreview, setFormImagePreview] = useState(null);
  const [formMail, setFormMail] = useState(user.email);

  useEffect(() => {
    checkUserImage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // check if user has already image
  const checkUserImage = () => {
    if (!user.image) {
      setFormImagePreview('https://bootdey.com/img/Content/avatar/avatar7.png');
    }
    if (user.image) {
      setFormImagePreview(user.image);
    }
  };

  // Onchange when a file is selected
  const selectFile = (event) => {
    setFormImage(event.target.files[0]);
    setFormImagePreview(URL.createObjectURL(event.target.files[0]));
  };

  // Onchange when mail changed
  const onChangeMail = (event) => {
    setFormMail(event.target.value);
  };

  // check form
  const validationSchema = Yup.object().shape({
    email: Yup.string().required('Email requis').email('Email invalide'),
    password: Yup.string()
      .required('Mot de passe requis')
      .min(6, 'Mot de passe trop court. 6 Caracteres minimum.'),
    passwordConfirmation: Yup.string()
      .label('confirm password')
      .required()
      .oneOf(
        [Yup.ref('password'), null],
        'Les mots de passes doivent être identiques'
      )
  });
  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors, isSubmitting } = formState;

  // Send form datas
  const onFormEditSubmit = ({ email, password }) => {
    const formData = new FormData();
    formData.append('id', user.id);
    if (email) {
      formData.append('email', email);
    }
    if (password) {
      formData.append('password', password);
    }
    if (formImage) {
      formData.append('image', formImage);
    }

    dispatch(profilEdit(formData));
  };

  return (
    <Fragment>
      <Box component={'form'} onSubmit={handleSubmit(onFormEditSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Avatar
              aria-label="recipe"
              className="userAvatar"
              src={formImagePreview}
              alt={user.email}
            ></Avatar>
          </Grid>
          <Grid item xs={8}>
            <label htmlFor="image">
              <input
                id="image"
                name="image"
                hidden
                style={{ display: 'none' }}
                type="file"
                accept="image/*"
                onChange={selectFile}
                // {...register('image')}
              />
              <Button color="secondary" variant="contained" component="span">
                Changer ma photo
              </Button>
            </label>
          </Grid>
          <Grid item xs={12}>
            <TextField
              onChange={onChangeMail}
              onBlur={onChangeMail}
              name="email"
              label="Mon adresse mail"
              value={formMail}
              variant="outlined"
              fullWidth
              sx={{ mt: 3 }}
              {...register('email')}
              error={errors.email ? true : false}
            />
            <Typography variant="text" color="error">
              {errors.email?.message}
            </Typography>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              name="password"
              label="Mot de passe"
              type="password"
              id="password"
              {...register('password')}
            />
            <Typography variant="text" color="error">
              {errors.password?.message}
            </Typography>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              name="passwordConfirmation"
              label="Confirmez le mot de passe"
              type="password"
              id="passwordConfirmation"
              {...register('passwordConfirmation')}
            />
            <Typography variant="text" color="error">
              {errors.passwordConfirmation?.message}
            </Typography>
          </Grid>
          {isSubmitting ? (
            <LoadingButton
              loading
              loadingPosition="start"
              startIcon={<Save />}
              fullWidth
              variant="outlined"
              sx={{ mt: 3, mb: 2 }}
            >
              Mise à jour en cours
            </LoadingButton>
          ) : (
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2 }}
            >
              Mettre à jour
            </Button>
          )}
        </Grid>
      </Box>
    </Fragment>
  );
}
