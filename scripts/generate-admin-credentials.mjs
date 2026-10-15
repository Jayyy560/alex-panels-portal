import crypto from 'node:crypto';

const email = process.argv[2] || 'admin@alexpanels.com';
const password = process.argv[3] || 'AlexPanels@2026';

const salt = crypto.randomBytes(16);
const hash = crypto.pbkdf2Sync(password, salt, 100000, 32, 'sha256');

console.log('--- ADMIN CREDENTIALS GENERATED ---');
console.log(`Email:    ${email}`);
console.log(`Password: ${password}`);
console.log('');
console.log('--- CLOUDFLARE SECRETS ---');
console.log(`ADMIN_EMAIL="${email}"`);
console.log(`ADMIN_PASSWORD_SALT="${salt.toString('hex')}"`);
console.log(`ADMIN_PASSWORD_HASH="${hash.toString('hex')}"`);
console.log('-----------------------------------');
