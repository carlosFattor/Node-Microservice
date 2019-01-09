const url = require('url')

module.exports = (app) => {
  const consul = app.consul.config

  app.get('/api/v1/user/*', (req, res) => {
    const URI = consul.getData('UserModule')
    const URL = url.format({
      pathname: URI + req.path,
      query:req.query
    })
    res.redirect(307, URL)
  })
}