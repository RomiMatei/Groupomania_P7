import { useEffect, Fragment, useState } from 'react';

import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation
} from 'react-router-dom';

import { history } from 'helpers';
import { Nav, PrivateRoute, MessageSnackBar } from 'components';
import { Home } from 'pages/home';
import { Profile } from 'pages/profile';
import { LoginPage, SignUpPage } from 'pages/login';
import { GuestPage } from 'pages/commons/guest.page';
import { CssBaseline } from '@mui/material';

export { App };

function App() {
  history.navigate = useNavigate();
  history.location = useLocation();

  return (
    <Fragment>
      <CssBaseline />
      <Nav />
      <MessageSnackBar />

      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              {' '}
              <Home />{' '}
            </PrivateRoute>
          }
        />
        <Route
          path="/user/:id"
          element={
            <PrivateRoute>
              {' '}
              <Profile />{' '}
            </PrivateRoute>
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<SignUpPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Fragment>
  );
}
