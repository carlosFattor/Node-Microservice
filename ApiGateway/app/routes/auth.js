const url = require('url')
const proxy = require('express-http-proxy')

function formatResource(req, consul) {
  const service = req.path.split('/')[3]
  const URI = consul.getData(service)
  const URL = url.format({
    pathname: URI + req.path,
    query: req.query
  })
  return { URI, service, URL }
}

module.exports = (app) => {
  const api = app.api.auth
  const consul = app.consul.config

  app.get('/api/version', api.verifyVersion)

  app.use('/api/v1/*', api.verifyToken)

  app.get('/api/v1/*', (req, res) => {
    const { URI, service, URL } = formatResource(req, consul)
    if (!URI) {
      return res.status(503).json({
        info: `service ${service} temporarily unavailable`
      })
    }
    res.redirect(307, URL)
  })

  app.post('/api/v1/*', (req, res) => {
    const { URI, service, URL } = formatResource(req, consul)
    if (!URI) {
      return res.status(503).json({
        info: `service ${service} temporarily unavailable`
      })
    }
    res.redirect(307, URL)
  })

  app.put('/api/v1/*', (req, res) => {
    const { URI, service, URL } = formatResource(req, consul)
    if (!URI) {
      return res.status(503).json({
        info: `service ${service} temporarily unavailable`
      })
    }
    res.redirect(307, URL)
  })

  app.delete('/api/v1/*', (req, res) => {
    const { URI, service, URL } = formatResource(req, consul)
    if (!URI) {
      return res.status(503).json({
        info: `service ${service} temporarily unavailable`
      })
    }
    res.redirect(307, URL)
  })

  app.patch('/api/v1/*', (req, res) => {
    const { URI, service, URL } = formatResource(req, consul)
    if (!URI) {
      return res.status(503).json({
        info: `service ${service} temporarily unavailable`
      })
    }
    res.redirect(307, URL)
  })

  app.post('/api/user-service/authentication', (req, res) => {
    const URI = consul.getData('user-service')
    const URL = url.format({
      pathname: URI + req.path,
      query: req.query
    })
    if (!URI) {
      return res.status(503).json({
        info: 'service user-service temporarily unavailable'
      })
    }
    res.redirect(307, URL)
  })
}
