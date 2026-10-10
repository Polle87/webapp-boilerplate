import { createClient } from '@libsql/client'
import { drizzle, type LibSQLDatabase } from 'drizzle-orm/libsql'
import { migrate } from 'drizzle-orm/libsql/migrator'
import { mkdir } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { pathToFileURL } from 'node:url'
import { users } from './schema.js'

export const schema = { users }

export type AppDatabase = LibSQLDatabase<typeof schema>

export async function createDatabase(): Promise<{
    db: AppDatabase
    close: () => void
}> {
    const databasePath = resolve(process.cwd(), process.env.DATABASE_PATH ?? 'data/app.sqlite')
    await mkdir(dirname(databasePath), { recursive: true })

    const client = createClient({ url: pathToFileURL(databasePath).href })
    const db = drizzle(client, { schema })
    try {
        await migrate(db, { migrationsFolder: resolve(process.cwd(), 'drizzle') })
    } catch (error) {
        client.close()
        throw error
    }

    return {
        db,
        close: () => {
            client.close()
        },
    }
}
