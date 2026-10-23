// Create a Snack-compatible source package from the ONE canonical App.js.
// Does not publish code, change Apple Shortcuts, or contact a service.
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const out = path.join(root, 'snack-export');
const app = fs.readFileSync(path.join(root, 'App.js'), 'utf8');
const pkg = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'));
if (!app.includes('export default function App()')) throw new Error('Canonical native App.js not found');
fs.mkdirSync(out, {recursive: true});
fs.writeFileSync(path.join(out, 'App.js'), app);
fs.writeFileSync(path.join(out, 'package.json'), JSON.stringify({
  name: 'jarvis-iphone-snack-test',
  private: true,
  dependencies: {
    expo: pkg.dependencies.expo,
    react: pkg.dependencies.react,
    'react-native': pkg.dependencies['react-native'],
    'react-native-webview': pkg.dependencies['react-native-webview']
  }
}, null, 2) + '\n');
fs.writeFileSync(path.join(out, 'README.md'), '# JARVIS Snack Test\n\nGenerated from ../App.js. Do not edit this copy. Paste App.js into an Expo Snack with the matching SDK and react-native-webview dependency. This does not create or publish a Snack and is not an installed native iOS app.\n');
console.log('Snack test files generated from canonical App.js; no network or publishing performed.');
