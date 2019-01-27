import express from 'express';
import consign from 'consign';
import { urlencoded, json } from 'body-parser';
import expressValidator from 'express-validator';
import expressStatusMonitor from 'express-status-monitor';
import compression from 'compression';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';

const app = express();

export default () => {

  app.use(helmet());
  app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });

  app.use(morgan('common', {
    stream: {
      write: (message) => {
        // logger.info('request=> ' + message);
      }
    }
  }));
  app.use(cors());
  app.use(urlencoded({
    extended: true
  }));
  app.use(expressValidator());
  app.use(expressStatusMonitor());
  app.use(compression());
  app.use(json());
  app.set('secret', 'Gu14t0An4lyt1cs');

  consign({
    cwd: 'src/app'
  })
    .include('consul')
    .then('api')
    .then('routes/auth.js')
    .then('routes')
    .into(app);

  return app;
};