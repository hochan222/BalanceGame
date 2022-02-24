import axios from 'axios';

const host = process.env.HOST;
const port = process.env.PORT ? `:${process.env.PORT}` : '';

// `withCredentials` indicates whether or not cross-site Access-Control requests
// should be made using credentials
axios.defaults.withCredentials = process.env.ENV !== 'local';

export default axios.create({
  baseURL: `//${host}${port}`,
  headers: { 'content-type': 'application/x-www-form-urlencoded' },
  xsrfCookieName: '',
  timeout: 5000,
});
