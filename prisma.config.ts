import 'dotenv/config';
import { defineConfig } from '@prisma/config';

export default defineConfig({
    datasource: {
        provider: 'postgresql',
        url: process.env.DATABASE_URL
    },
    generator: {
        provider: 'prisma-client-js'
    },
    // @ts-ignore
    migrations: {
        seed: 'tsx prisma/seed.ts'
    }
});
