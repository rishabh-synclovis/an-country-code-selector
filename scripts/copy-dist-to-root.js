// Copies the ng-packagr build output to the repo root so the package is
// directly installable from GitHub (npm install github:user/repo), which
// skips any build step and just uses whatever is checked into the repo.
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const distDir = path.join(root, 'dist', 'ngx-country-code-picker');

function copyRecursive(src, dest) {
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    fs.mkdirSync(dest, { recursive: true });
    for (const entry of fs.readdirSync(src)) {
      copyRecursive(path.join(src, entry), path.join(dest, entry));
    }
  } else {
    fs.copyFileSync(src, dest);
  }
}

copyRecursive(path.join(distDir, 'fesm2022'), path.join(root, 'fesm2022'));
copyRecursive(path.join(distDir, 'index.d.ts'), path.join(root, 'index.d.ts'));

console.log('Copied dist/ngx-country-code-picker -> repo root (fesm2022/, index.d.ts)');
