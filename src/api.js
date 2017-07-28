import express from 'express';
import session from 'express-session';
import PrettyError from 'pretty-error';
import http from 'http';
import bodyParser from 'body-parser';
import * as actions from './actions/index';
import config from './config';
import apiConfig from './config/api';
import log4js from 'log4js';
import multer from 'multer';
import models from './models';
import { mapUrl } from './utils/url';
import { randomString } from './utils/utils';
import Auth from './utils/auth';
import response from './config/response';

// mongoose.connect(apiConfig.mongoose.db);
// mongoose.Promise = Promise;

const log = log4js.getLogger("app");
const pretty = new PrettyError();
const app = express();
const server = new http.Server(app);

const storage = multer.diskStorage({
  destination: (req, filter, cb) => {
    cb(null, apiConfig.uploadFolder);
  },
  filename: (req, filter, cb) => {
    const suffix = file.mimetype.split('/')[1];
    cb(null, `${randomString()}.${suffix}`);
  },
});

log4js.configure({
  appenders: [
    {type: 'console'},
    {
      type: 'file',
      filename: './logs/errors.log',
      pattern: '-yyyy-MM-dd',
      level: 'ERROR',
      maxLogSize: 10485760,
      category: ['cheese', 'console', 'http']
    }
  ],
  replaceConsole: true
});

app.use(multer(storage).single('file'));
app.use(log4js.connectLogger(log4js.getLogger('http'), { level: 'auto' }));
app.use(bodyParser.urlencoded( { extended: true }));
app.use(bodyParser.json({ limit: '50mb' }));

// auth middleware
app.use((req, res, next) => {
  if (config.auth.whitelist.includes(req.path)) {
    next();
    return;
  }
  Auth.checkAuth(req).then(result => {
    if (result) {
      next();
    }
  }).catch(err => {
    res.json(err);
  });
});

app.use((req, res) => {
  const splittedUrlPath = req.url.split('?')[0].split('/').slice(1);

  const {action, params} = mapUrl(actions, splittedUrlPath);

  if (action) {
    const device = req.header('EA-DEVICE');
    action(req, params, {models, device, response})
      .then((result) => {
        if (result instanceof Function) {
          result(res);
        } else {
          res.json(result);
        }
      }, (reason) => {
        if (reason && reason.redirect) {
          res.redirect(reason.redirect);
        } else {
          console.error('API ERROR:', pretty.render(reason));
          const code = reason.code || 0;
          let status = 500;
          if (parseInt(code / 1000) === 2) {
            status = 200;
          }
          res.status(reason.status || status).json(reason);
        }
      });
  } else {
    res.status(404).end('NOT FOUND');
  }
});

const bufferSize = 100;
const messageBuffer = new Array(bufferSize);

let messageIndex = 0;

console.log('Good jobs!! ==> Start to load server ...');

if (config.apiPort) {
  const runnable = app.listen(config.apiPort, (err) => {
    if (err) {
      console.error(err);
    }
    console.info('~)^(~  API is running on port %s', config.apiPort);
    console.info('~)*.*(~  Send requests to http://%s:%s', config.apiHost, config.apiPort);
  });

} else {
  console.error('):  ==>  ERROR: No PORT environment variable has been specified');
}