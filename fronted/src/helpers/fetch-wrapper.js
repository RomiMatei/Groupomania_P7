import { store, logout } from 'features';
import axios from 'axios';
import { messageShow } from '../features/messages.slice';

export const fetchWrapper = {
  get: request('GET'),
  post: request('POST'),
  put: request('PUT'),
  delete: request('DELETE')
};

function request(method) {
  return (url, data) => {
    const requestOptions = {
      headers: authHeader(url)
    };

    //POST method call backend API
    if (method === 'POST') {
      return axios
        .post(url, data, requestOptions)
        .then(handleResponse)
        .catch((err) => {
          handleResponse(err.response);
        });
    }

    //GET method call backend API
    if (method === 'GET') {
      return axios
        .get(url, requestOptions)
        .then(handleResponse)
        .catch((err) => {
          handleResponse(err.response);
        });
    }

    //PUT method call backend API
    if (method === 'PUT') {
      return axios
        .put(url, data, requestOptions)
        .then(handleResponse)
        .catch((err) => {
          handleResponse(err.response);
        });
    }

    //DELETE method call backend API
    if (method === 'DELETE') {
      return axios
        .delete(url, requestOptions)
        .then(handleResponse)
        .catch((err) => {
          handleResponse(err.response);
        });
    }
  };
}

// check token in header and api url
function authHeader(url) {
  const token = authToken();
  const isLoggedIn = !!token;
  const isApiUrl = url.startsWith(process.env.REACT_APP_API_URL);

  if (isLoggedIn && isApiUrl) {
    return { 'x-access-token': token };
  } else {
    return {};
  }
}

function authToken() {
  return store.getState().auth.user?.token;
}

function handleResponse(response) {
  const data = response.data;
  console.log(data);

  if (response.statusText !== 'OK') {
    if ([401, 403, 511].includes(response.status) && authToken()) {
      // auto logout if 401 Unauthorized or 403 Forbidden and 511 response returned from api
      if (data.message) {
        store.dispatch(
          messageShow({
            message: data.message.message,
            severity: data.message.severity
          })
        );
      }
      store.dispatch(logout());
    }

    const error = (data && data.message) || response.statusText;
    return Promise.reject(error);
  }

  if (data.message) {
    store.dispatch(
      messageShow({
        message: data.message.message,
        severity: data.message.severity
      })
    );
  }

  return data;
}
