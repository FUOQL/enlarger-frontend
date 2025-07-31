import { logger, validateEnv } from './context';
import startDevServer from './app_runner';

/**
 * Main entry point for starting the development server
 */
async function start() {
  logger.info('Starting Canva app development server...');

  // Validate environment variables
  validateEnv();

  // Start the development server
  await startDevServer();
}

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  logger.error('Uncaught Exception:', err);
  process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

// Start the application
start().catch((err) => {
  logger.error('Failed to start application:', err);
  process.exit(1);
});