import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import { config, logger, debugServer } from './context';
import generateSSLCert from '../ssl/ssl';
import webpackConfig from '../../webpack.config';

/**
 * Starts the webpack development server
 */
async function startDevServer() {
  const { app } = config;
  const isHttps = app.host === 'localhost' && true; // Force HTTPS for localhost

  let sslCert: {
    keyPath: string;
    certPath: string;
  } | null = null;

  if (isHttps) {
    sslCert = await generateSSLCert();
  }

  const devServerOptions: WebpackDevServer.Options = {
    host: app.host,
    port: app.port,
    open: false,
    hot: app.hmrEnabled,
    historyApiFallback: true,
    client: {
      overlay: {
        errors: true,
        warnings: false,
      },
      logging: 'info',
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
    },
  };

  if (isHttps && sslCert) {
    devServerOptions.server = {
      type: 'https',
      options: {
        key: sslCert.keyPath,
        cert: sslCert.certPath,
      },
    };
  }

  const compiler = webpack(webpackConfig);
  const server = new WebpackDevServer(devServerOptions, compiler);

  try {
    await server.start();
    debugServer(`Starting server on ${isHttps ? 'https' : 'http'}://${app.host}:${app.port}`);
    logger.info(`Development server running at ${isHttps ? 'https' : 'http'}://${app.host}:${app.port}`);
    if (app.hmrEnabled) {
      logger.info('Hot Module Replacement (HMR) is enabled');
    }
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
}

export default startDevServer;