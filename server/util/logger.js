/**
 * Project       - ShaCar
 * Team          - Group 3 Carshare
 * Last Modified - 2018/05/26
 * Authors
 *               - Paul Crow
 */
const log4js = require('log4js');
import config from '../config';

const env = process.env.NODE_ENV === 'production' ? 'production' : 'development';

log4js.configure({
  appenders: {
    loggly: {
      type: '@log4js-node/loggly',
      token: config.loggly.token,
      subdomain: config.loggly.subdomain,
      tags: [ ...config.loggly.tags, env ],
    },
  },
  categories: {
    default: { appenders: ['loggly'], level: 'debug' },
  },
});

const logger = log4js.getLogger('default');

export const debug = (msg) => {
  logger.debug(msg);
};

export const info = (msg) => {
  logger.info(msg);
};

export const err = (msg) => {
  logger.error(msg);
};
