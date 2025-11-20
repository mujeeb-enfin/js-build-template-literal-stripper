// strip-whitespace.js
// Node.js script executed post-Rollup-build to aggressively strip exotic
// and structural whitespace that standard minifiers (Terser) fail to remove.

const fs = require('fs');
const path = require('path');

// NOTE: This uses the built-in 'fs', 'path', and 'child_process' Node modules,
// which do not need to be listed in package.json dependencies.

const bundlePath = path.resolve(__dirname, 'dist/bundle.js');

try {
    // Read the final bundled file content
    let content = fs.readFileSync(bundlePath, 'utf8');

    console.log("[Aggressive Cleanup] Starting post-bundle character strip...");

    // 💥 The Ultimate Strip: Targets newlines, tabs, and every known exotic whitespace character
    const aggressiveStripRegex = new RegExp(
        // Literal escaped strings that Terser leaves behind (\n, \t, etc.)
        '\\\\n|\\\\t|' + 
        // All forms of standard/exotic/control whitespace
        '[\\r\\n\\t\\xA0\\u2002\\u2003\\u2007\\u200B]', 
        'g'
    );

    // Pass 1: Remove all newlines and exotic whitespace
    let cleanedContent = content.replace(aggressiveStripRegex, '');

    // Pass 2 (CRITICAL FIX): Remove single spaces adjacent to control characters or tags.
    // This fixes spaces next to <, >, {, }, and ` which survived minification.
    cleanedContent = cleanedContent
        .replace(/\s*(<|>)|\s*(\{|\}|`)\s*/g, '$1$2');


    // Pass 3: Collapse sequences of 2 or more standard spaces into one space
    cleanedContent = cleanedContent.replace(/ {2,}/g, ' ');


    // Write the cleaned content back to the bundle file
    fs.writeFileSync(bundlePath, cleanedContent, 'utf8');
    console.log("[Aggressive Cleanup] Successfully stripped exotic characters from bundle.js.");

} catch (error) {
    console.error(`[Aggressive Cleanup] Error processing bundle: ${error.message}`);
    process.exit(1);
}