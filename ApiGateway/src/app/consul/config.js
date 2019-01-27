const consul = require('consul')();

const consulData = {};

consul.catalog.datacenters(function (err, result) {
  if (err) throw err;
  console.log(result);
});

let known_data_instances = {};

const watcher = consul.watch({
  method: consul.health.service,
  options: {
    service: 'user-service',
    passing: true
  }
});

watcher.on('change', data => {
  known_data_instances = {};
  
  data.forEach(entry => {
    known_data_instances[entry.Service.Service] = `http://${entry.Service.Address}:${entry.Service.Port}`;
  });
});

watcher.on('error', err => {
  console.error('watch error', err);
});

consulData.getData = (serviceName) => {
  try {
    return known_data_instances[serviceName];
  } catch (error) {
    throw Error(`Service ${serviceName} unavaliable`);
  }
};

module.exports = () => {
  return Object.assign({}, consulData);
};