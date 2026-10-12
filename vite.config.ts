import react from '@vitejs/plugin-react';
import { defineConfig, type Plugin } from 'vitest/config';

/** Emits app.html: index.html without its landing-only preloads, served for every route but `/`. */
function appShell(): Plugin {
  return {
    name: 'app-shell',
    apply: 'build',
    enforce: 'post',
    generateBundle(_options, bundle) {
      const index = bundle['index.html'];
      if (index?.type !== 'asset') throw new Error('app-shell: index.html not in bundle');
      const html = String(index.source);
      const stripped = html.replace(/\n\s*<!-- landing-only:start[\s\S]*?<!-- landing-only:end -->/, '');
      if (stripped === html) throw new Error('app-shell: landing-only block not found in index.html');
      this.emitFile({ type: 'asset', fileName: 'app.html', source: stripped });
    },
  };
}

export default defineConfig({
  plugins: [react(), appShell()],
  test: {
    environment: 'jsdom',
    setupFiles: ['src/test/setup.ts'],
    css: { modules: { classNameStrategy: 'non-scoped' } },
  },
});
