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
  const consul = app.consul.config;
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
  * Method to refresh token
  */
  app.post('/api/user-service/refreshtoken', (req, res) => {
    const service = 'user-service';
    const URI = consul.getData(service);
 
    if (!URI) serviceUnavaliable(res, service);
 
    apiProxy.web(req, res, {
      target: URI
    });
  });
};