module.exports = (app) => {
  const auth = app.api.auth;

  //Login authentication
  app.post('/api/user-service/authentication', auth.authentication);

  //RefreshToken
  app.post('/api/user-service/refreshtoken', auth.refreshToken);

  //Send email with link to recover password
  app.post('/api/user-service/recover-password', auth.recoverPassword);
};