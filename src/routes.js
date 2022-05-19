const host = '';
const prefix = 'api/v1';

export default {
  apiLoginPath: () => [host, prefix, 'login'].join('/'),
  apiSignupPath: () => [host, prefix, 'signup'].join('/'),
  apiDataPath: () => [host, prefix, 'data'].join('/'),
  appRootPath: () => '/',
  appLoginPath: () => '/login',
  appSignupPath: () => '/signup',
  appAnyPath: () => '*',
};
