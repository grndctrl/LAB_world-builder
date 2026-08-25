/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  // three and the R3F stack are ESM-only; without this Turbopack leaves them
  // external in the Pages Router server build and fails to resolve them at SSR.
  bundlePagesRouterDependencies: true,
};
