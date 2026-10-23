// Publish only the existing public JARVIS prototype as an anonymous Expo Snack.
// Never include secrets, account data, private responses, or user credentials.
const fs = require('node:fs');
const path = require('node:path');
const { Snack } = require('snack-sdk');
const root = path.resolve(__dirname, '..');
const appCode = fs.readFileSync(path.join(root, 'App.js'), 'utf8');
if (!appCode.includes('export default function App()')) throw new Error('Canonical App.js missing');
if (/(?:sk-proj-|ghp_|github_pat_)/.test(appCode)) throw new Error('Potential secret in app');
async function run() {
  const snack = new Snack({
    name: 'JARVIS iPhone Test',
    description: 'Öffentlicher Test des bestehenden JARVIS-Prototyps; keine persönlichen Daten',
    sdkVersion: '54.0.0',
    files: {'App.js': {type: 'CODE', contents: appCode}},
    dependencies: {} // Expo Go SDK 54 already bundles react-native-webview
  });
  const result = await snack.saveAsync({ignoreUser: true});
  if (!result.id) throw new Error('Expo returned no saved Snack ID');
  const url = 'https://snack.expo.dev/' + encodeURIComponent(result.id);
  fs.writeFileSync(path.join(root, 'snack-published-url.txt'), url + '\n');
  console.log('SAVED_SNACK_URL=' + url);
  snack.setOnline(false);
}
run().catch(err => {console.error(err?.message || String(err)); process.exitCode=1;});
