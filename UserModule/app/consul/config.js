const consul = require('consul')()
const config = require('../../config/config')
const CONSUL_ID = require('uuid').v4()

process.on('SIGINT', () => {
  console.log('SIGINT. De-Registering...')
  const details = {
    id: CONSUL_ID
  }

  consul.agent.service.deregister(details, (err) => {
    if (err) {
      console.log('de-registered.', err)
    }
    process.exit()
  })
})

module.exports = () => {

  const details = {
    name: 'user-service',
    address: config.app.host,
    port: config.app.port,
    id: CONSUL_ID,
    check: {
      ttl: '10s',
      deregister_critical_service_after: '1m'
    }
  }

  consul.agent.service.register(details, err => {
    if(err) throw new Error(err.message)
    setInterval(() => {
      consul.agent.check.pass({
        id: `service:${CONSUL_ID}`
      }, err => {
        if (err) throw new Error(err)
      })
    }, 5 * 1000)
  })
}
