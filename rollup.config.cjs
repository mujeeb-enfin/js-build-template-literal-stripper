// rollup.config.cjs
// Rollup configuration with a custom post-build hook to aggressively strip
// exotic and non-essential whitespace characters from the final bundle.

const terser = require('@rollup/plugin-terser'); 
const resolve = require('@rollup/plugin-node-resolve');
const alias = require('rollup-plugin-alias'); 
const path = require('path');
const { execSync } = require('child_process'); 

const projectRoot = path.resolve(__dirname); 

// ⭐ The Post-Build Hook Plugin: Executes the cleanup script after Rollup finishes.
const postBuildStrip = () => {
    return {
        name: 'post-build-strip',
        // This hook runs after the bundle has been written to disk
        writeBundle() {
            console.log('\n[Rollup Hook] Executing post-build cleanup script...');
            try {
                // Execute the external Node.js script synchronously
                execSync('node strip-whitespace.js', { stdio: 'inherit' });
            } catch (error) {
                console.error('Post-build strip failed to execute script.');
                // Re-throw or exit process if the cleanup fails critically
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
    // 1. Alias Plugin
    alias({ 
        entries: [
            { find: '/assets', replacement: path.resolve(projectRoot, 'assets') }
        ]
    }),
    
    // 2. Resolve Plugin
    resolve({
        browser: true,
        preferBuiltins: false, 
    }),
    
    // 3. The Post-Build Hook (Runs after Terser, but listed before for structural clarity)
    postBuildStrip(), 

    // 4. Terser Plugin (Runs just before the custom cleanup script)
    terser.default({ 
      sourceMap: false, 
      compress: {
        passes: 5, 
        drop_console: true,
      },
      mangle: true,
      output: {
        comments: false,
        beautify: false,
      }
    }),
  ],
};