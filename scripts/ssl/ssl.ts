import * as crypto from 'crypto';
import * as fs from 'fs';
import * as path from 'path';
import { promisify } from 'util';
import { logger } from '../start/context';

const writeFileAsync = promisify(fs.writeFile);
const existsAsync = promisify(fs.exists);
const mkdirAsync = promisify(fs.mkdir);

// ssl config
const SSL_CONFIG = {
  keySize: 2048,
  certValidityDays: 365,
  commonName: 'localhost',
  organization: 'Canva',
  organizationalUnit: 'Canva Dev',
  country: 'AU',
  state: 'NSW',
  locality: 'Sydney',
};

/**
 * Generate a self-signed SSL certificate
 */
async function generateSSLCert(): Promise<{
  keyPath: string;
  certPath: string;
}> {
  const sslDir = path.join(__dirname, '..', '..', '.ssl');
  const keyPath = path.join(sslDir, 'server.key');
  const certPath = path.join(sslDir, 'server.crt');

  // Create ssl directory if it doesn't exist
  if (!(await existsAsync(sslDir))) {
    await mkdirAsync(sslDir, { recursive: true });
    logger.info(`Created SSL directory: ${sslDir}`);
  }

  // Check if files already exist
  if (await existsAsync(keyPath) && await existsAsync(certPath)) {
    logger.info('SSL certificate and key already exist');
    return { keyPath, certPath };
  }

  // Generate private key
  const privateKey = crypto.generatePrivateKey({
    type: 'pkcs8',
    format: 'pem',
    modulusLength: SSL_CONFIG.keySize,
    publicKeyEncoding: {
      type: 'spki',
      format: 'pem',
    },
    privateKeyEncoding: {
      type: 'pkcs8',
      format: 'pem',
      cipher: 'aes-256-cbc',
      passphrase: '',
    },
  });

  // Generate certificate signing request (CSR)
  const csr = crypto.createCertificateRequest({
    key: privateKey,
    attributes: [
      { name: 'commonName', value: SSL_CONFIG.commonName },
      { name: 'organizationName', value: SSL_CONFIG.organization },
      { name: 'organizationalUnitName', value: SSL_CONFIG.organizationalUnit },
      { name: 'countryName', value: SSL_CONFIG.country },
      { name: 'stateOrProvinceName', value: SSL_CONFIG.state },
      { name: 'localityName', value: SSL_CONFIG.locality },
    ],
  });

  // Generate self-signed certificate
  const cert = crypto.createSelfSignedCertificate({
    key: privateKey,
    csr,
    days: SSL_CONFIG.certValidityDays,
  });

  // Write files
  await writeFileAsync(keyPath, privateKey);
  await writeFileAsync(certPath, cert);

  logger.info(`Generated SSL certificate: ${certPath}`);
  logger.info(`Generated SSL private key: ${keyPath}`);

  return { keyPath, certPath };
}

export default generateSSLCert;