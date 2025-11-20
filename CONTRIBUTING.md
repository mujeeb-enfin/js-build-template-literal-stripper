# Contributing to JS Build Template Literal Stripper

Thank you for your interest in contributing! 🎉

## How to Contribute

### Reporting Bugs

1. Check existing issues first to avoid duplicates
2. Use the bug report template
3. Include:
   - Node.js version
   - Rollup version
   - Steps to reproduce
   - Expected vs actual behavior
   - Code examples

### Suggesting Features

1. Use the feature request template
2. Explain the use case clearly
3. Provide code examples if possible
4. Describe why this would be useful

### Pull Requests

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Make your changes
4. Test thoroughly with `npm run build`
5. Commit with clear messages: `git commit -m 'Add feature: description'`
6. Push to your fork: `git push origin feature/my-feature`
7. Open a Pull Request with a clear description

## Development Guidelines

### Code Style

- Use 2 spaces for indentation
- Add comments for complex regex patterns
- Follow existing code structure
- Keep functions focused and small

### Testing

Before submitting a PR, test your changes:

```bash
# Install dependencies
npm install

# Run build
npm run build

# Verify output
ls -lh dist/bundle.js
cat dist/bundle.js
```

### Commit Messages

Use clear, descriptive commit messages:

```
Good: "Add support for preserving specific whitespace patterns"
Bad: "fix stuff"
```

## Project Structure

```
js-build-template-literal-stripper/
├── src/main.js              # Entry point (customize for your project)
├── rollup.config.cjs        # Rollup configuration
├── strip-whitespace.js      # Post-build cleanup script
├── package.json
└── README.md
```

## Questions?

- Open an issue with the `question` label
- Check existing issues and discussions
- Review the README.md for documentation

## Code of Conduct

Be respectful and constructive in all interactions. We're here to learn and build together.

---

**Thank you for contributing!** 🙏

Built with ❤️ by MR-INNOVATIONS.COM
