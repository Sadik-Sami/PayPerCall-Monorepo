const fs = require('fs');

const files = [
  'apps/web/lib/data/services/app-dev-subpages.tsx',
  'apps/web/lib/data/services/cms-subpages.tsx',
  'apps/web/lib/data/services/web-dev-subpages.tsx'
];

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/\tCASE_STUDIES:\s*\[[\s\S]*?\],\n(\tFAQ_ITEMS:)/g, '$1');
  fs.writeFileSync(file, content);
  console.log(`Cleaned ${file}`);
}
