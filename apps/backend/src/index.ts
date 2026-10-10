import Fastify from 'fastify'
import { createDatabase } from './db/database.js'

const app = Fastify({ logger: true })

const database = await createDatabase()

app.decorate('db', database.db)

app.addHook('onClose', () => {
    database.close()
})

app.get('/health', () => ({ status: 'ok' }))

await app.listen({
    host: process.env.HOST ?? '0.0.0.0',
    port: Number(process.env.PORT ?? 3001),
})
