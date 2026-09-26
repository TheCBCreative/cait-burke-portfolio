const base = 'http://localhost:4173';

module.exports = {
  urls: ['/', '/home', '/work/blog-composer', '/work/the-cb-creative', '/not-a-page'].map((path) => base + path),
  server: {
    command: 'npx vite preview --port 4173 --strictPort',
    url: `${base}/`,
    readyTimeout: 30000,
  },
  failOn: 'serious',
  // Entrance animations would otherwise be measured mid-fade.
  reducedMotion: true,
  viewport: { width: 1440, height: 900 },
};
