# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2024-11-20

### Added
- Initial release of JS Build Template Literal Stripper
- Rollup configuration with Terser integration
- Custom post-build cleanup script (`strip-whitespace.js`)
- Aggressive whitespace stripping for template literals
- Three-pass cleanup process:
  - Pass 1: Remove exotic Unicode whitespace
  - Pass 2: Strip spaces adjacent to HTML tags and template syntax
  - Pass 3: Collapse multiple spaces
- Support for alias plugin configuration (`/assets` path)
- Node module resolution
- Drop console.log in production builds
- 5-pass Terser compression
- Example main.js with component imports

### Features
- ✅ Strips all newlines, tabs, and exotic Unicode spaces
- ✅ Removes spaces adjacent to HTML tags (`<`, `>`)
- ✅ Removes spaces near template literal syntax (`{`, `}`, `` ` ``)
- ✅ Collapses multiple consecutive spaces
- ✅ Works with any Rollup project
- ✅ Zero runtime dependencies
- ✅ Production-tested across multiple platforms

### Documentation
- Complete README with build process breakdown
- Real-world impact metrics (16-19% bundle size reduction)
- Configuration examples
- Usage examples with actual code

[1.0.0]: https://github.com/mujeeb-enfin/js-build-template-literal-stripper/releases/tag/v1.0.0
