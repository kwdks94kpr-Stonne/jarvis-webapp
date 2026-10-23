// Publish only the existing public JARVIS prototype as an anonymous Expo Snack.
// Never include secrets, account data, private responses, or user credentials.
const fs = require('node:fs');
const path = require('node:path');
const { Snack } = require('snack-sdk');
const root = path.resolve(__dirname, '..');
let appCode = fs.readFileSync(path.join(root, 'App.js'), 'utf8');
appCode = appCode.replace("import {WebView} from 'react-native-webview';", '');
const begin = appCode.indexOf(':<View style={styles.legacy}>');
const endMarker = '</View>}\\n  </SafeAreaView>';
const finish = appCode.indexOf(endMarker.replace('\\n', '\n'), begin);
if (begin < 0 || finish < 0) throw new Error('Native view structure has changed');
const testView = `:<View style={styles.legacy}><Pressable style={styles.back} onPress={()=>setSection('home')}><Text style={styles.buttonText}>‹ ZURÜCK</Text></Pressable><Text style={styles.description}>Expo-Go-Test der nativen JARVIS-Oberfläche ohne WebView. Für die Webzentrale Safari öffnen.</Text><Pressable style={styles.primary} onPress={()=>Linking.openURL(WEB_URL)}><Text style={styles.primaryText}>JARVIS IN SAFARI ÖFFNEN</Text></Pressable></View>}\\n  </SafeAreaView>`;
appCode = appCode.slice(0,begin) + testView.replace('\\n','\n') + appCode.slice(finish+endMarker.replace('\\n','\n').length);

if (!appCode.includes('export default function App()')) throw new Error('Canonical App.js missing');
if (/(?:sk-proj-|ghp_|github_pat_)/.test(appCode)) throw new Error('Potential secret in app');
async function run() {
  const snack = new Snack({
    name: 'JARVIS iPhone Test',
    description: 'Öffentlicher Test des bestehenden JARVIS-Prototyps; keine persönlichen Daten',
    sdkVersion: '54.0.0',
    files: {'App.js': {type: 'CODE', contents: appCode}},
    dependencies: {} // Snack-only test does not import WebView
  });
  const result = await snack.saveAsync({ignoreUser: true});
  if (!result.id) throw new Error('Expo returned no saved Snack ID');
  const url = 'https://snack.expo.dev/' + encodeURIComponent(result.id);
  fs.writeFileSync(path.join(root, 'snack-published-url.txt'), url + '\n');
  console.log('SAVED_SNACK_URL=' + url);
  snack.setOnline(false);
}
run().catch(err => {console.error(err?.message || String(err)); process.exitCode=1;});
