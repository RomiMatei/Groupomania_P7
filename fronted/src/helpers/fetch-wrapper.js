import { store, authActions } from 'features';
import axios from 'axios';

export const fetchWrapper = {
  get: request('GET'),
  post: request('POST'),
  put: request('PUT'),
  delete: request('DELETE')
};

// function request(method) {
//   return (url, body) => {
//     const requestOptions = {
//       method,
//       headers: authHeader(url)
//     };
//     if (body) {
//       // requestOptions.headers['Content-Type'] = 'application/json';
//       requestOptions.body = JSON.stringify(body);
//     }

//     if (method === 'POST') {
//       // requestOptions.headers['Content-Type'] = 'multipart/form-data';
//       console.log(body);

//       // for (var pair of body.args.entries()) {
//       //   console.log(pair[0] + ', ' + pair[1]);
//       // };
//       requestOptions.body = body.data;
//     }
//     console.log(requestOptions);
//     return fetch(url, requestOptions).then(handleResponse);
//   };
// }

function request(method) {
  return (url, data) => {
    const requestOptions = {
      headers: authHeader(url)
    };

    if (method === 'POST') {
      return axios.post(url, data, requestOptions).then(handleResponse);
    }

    if (method === 'GET') {
      return axios.get(url, requestOptions).then(handleResponse);
    }

    if (method === 'PUT') {
      return axios.put(url, data, requestOptions).then(handleResponse);
    }

    if (method === 'DELETE') {
      return axios.delete(url, data, { requestOptions }).then(handleResponse);
    }
  };
}

// helper functions

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
  // console.log(response);
  const data = response.data;
  if (response.statusText !== 'OK') {
    if ([401, 403, 511].includes(response.status) && authToken()) {
      // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
      const logout = () => store.dispatch(authActions.logout());
      logout();
    }

    const error = (data && data.message) || response.statusText;
    return Promise.reject(error);
  }

  return data;
}
// function handleResponse(response) {
//   return response.text().then((text) => {
//     const data = text && JSON.parse(text);
//     if (!response.ok) {
//       if ([401, 403, 511].includes(response.status) && authToken()) {
//         // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
//         const logout = () => store.dispatch(authActions.logout());
//         logout();
//       }

//       const error = (data && data.message) || response.statusText;
//       return Promise.reject(error);
//     }

//     return data;
//   });
// }
