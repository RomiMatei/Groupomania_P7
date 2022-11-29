import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { Typography, Alert, Link, Box, TextField, Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import SaveIcon from '@mui/icons-material/Save';

import { history } from 'helpers';
import { signUp } from 'features';

export { SignUp };

function SignUp() {
  const dispatch = useDispatch();
  const authError = useSelector((x) => x.auth.error);

  // Sign Up form validation rules
  const validationSchema = Yup.object().shape({
    email: Yup.string().required('Email requis').email('Email invalide'),
    password: Yup.string()
      .required('Mot de passe requis')
      .min(6, 'Mot de passe trop court. 6 Caracteres minimum'),
    passwordConfirmation: Yup.string()
      .label('confirm password')
      .required()
      .oneOf(
        [Yup.ref('password'), null],
        'Les mots de passes doivent être identiques'
      )
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  // get functions to build form with useForm() hook
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors, isSubmitting } = formState;

  // Submit form datas
  function onSubmit({ email, password }) {
    return dispatch(signUp({ email, password }));
  }

  // if user want to return connection page
  function connectionPage() {
    history.navigate('/login');
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
          w
        >
          Créer Mon Compte
        </Button>
      )}
      <Link href="#" onClick={connectionPage} variant="body2">
        {'Connection'}
      </Link>
    </Box>
  );
}
