import { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
// import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';


import { history } from 'helpers';
import { authActions } from 'features';
import { Typography, Alert, Link, Box, TextField, Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import SaveIcon from '@mui/icons-material/Save';

export { SignUp };

function SignUp() {
  const dispatch = useDispatch();
  const authUser = useSelector((x) => x.auth.user);
  const authError = useSelector((x) => x.auth.error);

  useEffect(() => {
    // redirect to home if already logged in
    if (authUser) history.navigate('/');

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // form validation rules
  const validationSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Email is invalid'),
    password: Yup.string().required('Password is required'),
    passwordConfirmation: Yup.string()
      .label('confirm password')
      .required()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  // get functions to build form with useForm() hook
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors, isSubmitting } = formState;

  function onSubmit({ email, password }) {
    return dispatch(authActions.signup({ email, password }));
  }
  return (
    <Box
      component={'form'}
      onSubmit={handleSubmit(onSubmit)}
      sx={{ mt: 2, mb: 3, width: '95%' }}
    >
      {authError && (
        <Alert severity="error" sx={{ mt: 1, mb: 3 }}>
          {authError.message}
        </Alert>
      )}
      <TextField
        label="Email"
        variant="outlined"
        fullWidth
        name="email"
        // value={email}
        {...register('email')}
        error={errors.email ? true : false}
      />
      <Typography variant="text" color="error">
        {errors.email?.message}
      </Typography>
      <TextField
        variant="outlined"
        margin="normal"
        required
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
        required
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
      {isSubmitting ? (
        <LoadingButton
          loading
          loadingPosition="start"
          startIcon={<SaveIcon />}
          fullWidth
          variant="outlined"
          sx={{ mt: 3, mb: 2 }}
        >
          Création En Cours
        </LoadingButton>
      ) : (
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 3, mb: 2 }}
          // disabled={this.state.loading}
        >
          Créer Mon Compte
        </Button>
      )}
    </Box>
  );
}
