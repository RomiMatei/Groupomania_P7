import * as React from 'react';
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation
} from 'react-router-dom';

import { history } from 'helpers';
import { Nav, PrivateRoute } from 'components';
import { Home } from 'pages/home';
// import { LoginPage, SignUpPage } from 'pages/login';
import { GuestPage } from 'pages/commons/guest.page';
import CssBaseline from '@mui/material/CssBaseline';

export { App };

function App() {
  // init custom history object to allow navigation from
  // anywhere in the react app (inside or outside components)
  history.navigate = useNavigate();
  history.location = useLocation();

  return (
    <React.Fragment>
      <CssBaseline />
      <Nav />

      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route path="/login" element={<GuestPage />} />
        {/* <Route path="/register" element={<SignUpPage />} /> */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </React.Fragment>
  );
}
