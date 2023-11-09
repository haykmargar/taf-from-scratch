import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
    plugins: [tsconfigPaths()],
    test: {
        maxThreads: 4,
        include: [ 'tests/vitest-tests/*' ],
        browser: {
            name: 'chromium',
            provider: 'playwright',
            headless: false,
        },
    },
});
