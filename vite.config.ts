import react from '@vitejs/plugin-react';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import svgr from 'vite-plugin-svgr';

export default {
    plugins: [
        react(),
        viteTsconfigPaths(),
        svgr({
            include: '**/*.svg?react',
        }),
    ],
};