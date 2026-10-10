import { spawnSync } from 'node:child_process'
import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'

const repositoryDirectory = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const distDirectory = resolve(repositoryDirectory, 'dist')
const serverDirectory = resolve(distDirectory, 'server')

await rm(distDirectory, { recursive: true, force: true })

const yarnScript = resolve(repositoryDirectory, '.yarn/releases/yarn-4.18.1.cjs')
const build = spawnSync(
    process.execPath,
    [yarnScript, 'workspaces', 'foreach', '--all', '--topological-dev', 'run', 'build'],
    {
        cwd: repositoryDirectory,
        stdio: 'inherit',
    },
)

if (build.error) {
    throw build.error
}

if (build.status !== 0) {
    process.exit(build.status ?? 1)
}

await mkdir(serverDirectory, { recursive: true })
await cp(
    resolve(repositoryDirectory, 'apps/backend/drizzle'),
    resolve(serverDirectory, 'drizzle'),
    { recursive: true },
)
await cp(resolve(repositoryDirectory, 'deployment/templates'), distDirectory, { recursive: true })

const backendPackage = JSON.parse(
    await readFile(resolve(repositoryDirectory, 'apps/backend/package.json'), 'utf8'),
)

await writeFile(
    resolve(serverDirectory, 'package.json'),
    `${JSON.stringify(
        {
            name: 'boilerplate-server',
            private: true,
            type: 'module',
            engines: { node: '>=24 <25' },
            dependencies: backendPackage.dependencies,
        },
        null,
        2,
    )}\n`,
)
