import { createProxyServer } from 'http-proxy';
import { serviceUnavaliable, formatResource } from '../utils';

const apiProxy = createProxyServer();

apiProxy.on('proxyReq', (proxyReq, req) => {
  if (req.body) {
    const bodyData = JSON.stringify(req.body);
    proxyReq.setHeader('Content-Type','application/json');
    proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
    // stream the content
    proxyReq.write(bodyData);
  }
});


module.exports = (app) => {
  const api = app.api.auth;
  const consul = app.consul.config;

  /*
   * API version
   */
  app.get('/api/version', api.verifyVersion);

  /*
   * Verify all request if the token is valid
   */
  app.use('/api/v1/*', api.verifyToken);

  /*
  * Method to authenticate users
  */
  app.post('/api/user-service/authentication', (req, res) => {
    const service = 'user-service';
    const URI = consul.getData(service);
   
    if (!URI) serviceUnavaliable(res, service);
   
    apiProxy.web(req, res, {
      target: URI
    });
  });

  /*
   * Handler all request and find a specified service needed
   */
  app.all('/api/v1/*', (req, res) => {
    const {
      URI,
      service
    } = formatResource(req, consul);
 
    if (!URI) serviceUnavaliable(res, service);
 
    apiProxy.web(req, res, {
      target: URI
    });
  });
};