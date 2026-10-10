import type { AppDatabase } from './database.js'

declare module 'fastify' {
    interface FastifyInstance {
        db: AppDatabase
    }
}
