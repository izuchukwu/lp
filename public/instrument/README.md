# Instrument auto-update manifests

This directory hosts Instrument's electron-updater manifests. They're served as
static files by Next.js (no API routes) at `https://izuelechi.com/instrument/`,
e.g. `https://izuelechi.com/instrument/latest-mac.yml`.

The release script in the **instrument** repo (`scripts/release.sh`) writes the
manifests here, then commits + pushes — Vercel auto-deploys lp on push.

Binaries (`.dmg`, `.zip`, `.AppImage`, `.exe`) are NOT in this repo. They
live on GitHub Releases at `github.com/izuchukwu/instrument/releases`. Manifest
`url:` and `path:` fields point at those release-asset URLs.

**Do not commit binaries here** — they are large, mutate often, and don't
belong in git.
