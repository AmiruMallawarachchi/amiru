const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'public', 'Laptopimages');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.png')).sort();

console.log(`Found ${files.length} images.`);

files.forEach((file, i) => {
  const newName = `${String(i + 1).padStart(4, '0')}.png`; // 0001.png
  fs.renameSync(path.join(dir, file), path.join(dir, newName));
});

console.log('Renaming complete.');
