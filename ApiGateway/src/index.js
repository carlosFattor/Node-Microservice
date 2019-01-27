import app from './config/custom-express';
import config from './config';

app().listen(config.app.port, function () {

  console.log(`Server runing in PORT:${config.app.port}`);
});

export default app;