import chalk from 'chalk';
import debug from 'debug';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables
const envPath = path.resolve(__dirname, '..', '..', '.env');
dotenv.config({ path: envPath });

// Create a logger
const logger = {
  info: (...args: any[]) => console.log(chalk.blue('[INFO]'), ...args),
  warn: (...args: any[]) => console.log(chalk.yellow('[WARN]'), ...args),
  error: (...args: any[]) => console.log(chalk.red('[ERROR]'), ...args),
  debug: (...args: any[]) => {
    if (process.env.DEBUG) {
      console.log(chalk.green('[DEBUG]'), ...args);
    }
  },
};

// Create debuggers for different modules
const debugApp = debug('canva:app');
const debugServer = debug('canva:server');
const debugAuth = debug('canva:auth');

// App configuration
const config = {
  app: {
    port: parseInt(process.env.CANVA_FRONTEND_PORT || '8080', 10),
    host: 'localhost',
    hmrEnabled: process.env.CANVA_HMR_ENABLED === 'true',
    appOrigin: process.env.CANVA_APP_ORIGIN,
  },
  backend: {
    host: process.env.CANVA_BACKEND_HOST,
    port: parseInt(process.env.CANVA_BACKEND_PORT || '443', 10),
  },
  auth: {
    appId: process.env.CANVA_APP_ID,
  },
};

// Validate required environment variables
function validateEnv() {
  const requiredEnvVars = [
    'CANVA_APP_ID',
    'CANVA_APP_ORIGIN',
  ];

  const missingVars = requiredEnvVars.filter(
    (varName) => !process.env[varName]
  );

  if (missingVars.length > 0) {
    logger.error(`Missing required environment variables: ${missingVars.join(', ')}`);
    logger.error(`Please set these variables in the .env file at ${envPath}`);
    process.exit(1);
  }

  // Validate app origin
  if (config.app.appOrigin && !config.app.appOrigin.startsWith('https://')) {
    logger.warn('CANVA_APP_ORIGIN should start with https:// for production');
  }

  return true;
}

export {
  logger,
  config,
  validateEnv,
  debugApp,
  debugServer,
  debugAuth,
};