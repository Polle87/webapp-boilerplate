import { build } from 'esbuild';
import { rm } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const backendDirectory = dirname(fileURLToPath(import.meta.url));
const outputDirectory = resolve(backendDirectory, 'dist');

await rm(outputDirectory, { recursive: true, force: true });

await build({
    entryPoints: [resolve(backendDirectory, 'src/index.ts')],
    outfile: resolve(outputDirectory, 'index.js'),
    bundle: true,
    packages: 'external',
    platform: 'node',
    target: 'node24',
    format: 'esm',
    sourcemap: true,
    alias: {
        '@boilerplate/shared': resolve(backendDirectory, '../shared/src/index.ts'),
    },
});
