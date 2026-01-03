import { config as loadEnv } from 'dotenv';

loadEnv({ path: '.env.local' });

export default {
  datasources: {
    db: {
      url: process.env.DATABASE_URL!,
    },
  },
};
