import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const users = sqliteTable('users', {
    id: text('id').primaryKey(),
    username: text('username').notNull(),
    globalName: text('global_name'),
    avatar: text('avatar'),
    email: text('email'),
    verified: integer('verified', { mode: 'boolean' }),
    banner: text('banner'),
    accentColor: integer('accent_color'),
})
