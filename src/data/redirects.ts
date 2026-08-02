// URL redirect map — add entries as needed
// Format: '/old-path': '/new-path'
// NOTE: avoid case-only redirects (e.g. /Foo/ -> /foo/). On case-insensitive
// filesystems the redirect stub and the target page resolve to the same output
// path and clobber each other at build time. Handle case normalization at the
// host/CDN level instead.
export const redirects: Record<string, string> = {};
