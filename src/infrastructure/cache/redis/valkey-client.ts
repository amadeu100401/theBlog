import 'server-only';
import Redis from 'ioredis';

const globalForValkey = global as unknown as { valkey: Redis };

export const valkeyClient =
  globalForValkey.valkey || new Redis(process.env.VALKEY_URL as string);

if (process.env.NODE_ENV !== 'production')
  globalForValkey.valkey = valkeyClient;
