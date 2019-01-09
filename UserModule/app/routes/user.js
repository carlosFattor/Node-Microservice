const HTTP = require('http-status-codes')

module.exports = (app) => {
  const api = app.api.user
  const auth = app.api.auth

  app.get('/api/v1/user-service/version', api.verifyVersion)

  app.post('/api/v1/user-service/version', api.verifyVersion)

  app.get('/api/user-service/health', (req, res) => {
    res.send(HTTP.OK)
  })

  //Login authentication
  app.post('/api/user-service/authentication', auth.authentication)
}
