// rollup.config.cjs
// FINAL PRODUCTION CONFIGURATION: Complete build pipeline for JS, HTML, and CSS.
// - JS is minified by Terser and aggressively cleaned by a post-build script.
// - HTML and CSS are copied and minified using dedicated tools.

const terser = require('@rollup/plugin-terser'); 
const resolve = require('@rollup/plugin-node-resolve');
const alias = require('rollup-plugin-alias'); 
const copy = require('rollup-plugin-copy'); // Handles static assets (HTML/CSS)
const path = require('path');
const { execSync } = require('child_process'); 

// Dedicated Minifiers for HTML and CSS
const { minify } = require('html-minifier-terser');
const CleanCSS = require('clean-css');
const cssMinifier = new CleanCSS({}); 

const projectRoot = path.resolve(__dirname); 

// ⭐ 1. Custom Plugin: Executes the cleanup script after Rollup finishes writing bundle.js.
const postBuildStrip = () => {
    return {
        name: 'post-build-strip',
        writeBundle() {
            console.log('\n[Rollup Hook] Executing post-build JS cleanup script...');
            try {
                // Executes strip-whitespace.js on the final dist/bundle.js file
                execSync('node strip-whitespace.js', { stdio: 'inherit' });
            } catch (error) {
                console.error('Post-build strip failed to execute script.');
            }
        }
    };
};

module.exports = {
  input: path.resolve(projectRoot, 'src/main.js'),

  output: {
    file: 'dist/bundle.js',
    format: 'iife', 
    sourcemap: false,
  },

  plugins: [
    // 2. Alias Plugin
    alias({ entries: [{ find: '/assets', replacement: path.resolve(projectRoot, 'assets') }] }),
    
    // 3. Resolve Plugin
    resolve({ browser: true, preferBuiltins: false }),

    // 4. The Copy Plugin with Minification Transforms (HTML/CSS)
    copy({
        targets: [
            // Target 1: HTML Minification
            { 
                src: 'index.html', 
                dest: 'dist',
                transform: (contents) => minify(contents.toString(), {
                    collapseWhitespace: true,
                    removeComments: true,
                    minifyCSS: true,
                    minifyJS: true,
                    removeScriptTypeAttributes: true,
                    removeStyleLinkTypeAttributes: true,
                })
            },
            // Target 2: CSS Minification
            { 
                src: 'style.css', 
                dest: 'dist',
                // Uses the CleanCSS instance to minify the file content
                transform: (contents) => cssMinifier.minify(contents.toString()).styles
            }
        ],
        // Runs at the start of the build to ensure files are ready
        hook: 'buildStart' 
    }),
    
    // 5. The Post-Build Hook (Applies exotic whitespace cleanup to bundle.js)
    postBuildStrip(), 

    // 6. Terser Plugin (Applies standard minification to JS code)
    terser.default({ 
      sourceMap: false, 
      compress: { passes: 5, drop_console: true },
      mangle: true,
      output: { comments: false, beautify: false }
    }),
  ],
};