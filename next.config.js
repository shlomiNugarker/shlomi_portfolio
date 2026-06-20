module.exports = {
  reactStrictMode: true,
  eslint: {
    // ESLint is run separately via `yarn lint`. Skipping it during build avoids
    // a plugin-resolution crash from the legacy eslint-plugin-react chain; the
    // ESLint stack is modernized to flat config in a later upgrade stage.
    ignoreDuringBuilds: true,
  },
}
