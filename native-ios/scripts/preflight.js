// JARVIS preflight: read-only validation, no network, account or build actions.
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const errors = [];
const read = (name) => {
  try { return fs.readFileSync(path.join(root, name), 'utf8'); }
  catch (error) { errors.push(name + ': Datei fehlt'); return ''; }
};
const json = (name) => {
  try { return JSON.parse(read(name)); }
  catch (error) { errors.push(name + ': ungültiges JSON'); return {}; }
};
const app = json('app.json').expo || {};
const pkg = json('package.json');
const eas = json('eas.json');
const state = json('project-state.json');
const code = read('App.js');
if (app.name !== 'JARVIS') errors.push('app.json: unerwarteter App-Name');
if (!app.ios?.bundleIdentifier) errors.push('app.json: iOS-Bundle-ID fehlt');
if (!app.scheme) errors.push('app.json: App-URL-Schema fehlt');
if (!pkg.dependencies?.expo || !pkg.dependencies?.['react-native-webview']) errors.push('package.json: Expo oder WebView fehlt');
if (!pkg.dependencies?.['expo-dev-client']) errors.push('package.json: Entwicklungsclient für den iOS-Test fehlt');
if (!pkg.scripts?.preflight?.includes('scripts/preflight.js')) errors.push('package.json: Vorprüfung nicht als Skript eingebunden');
if (!code.includes('Privat starten') || !code.includes('Im Web-HUD anzeigen')) errors.push('App.js: explizite Auswahl für vertrauliche KI-Rückgabe fehlt');
if (!code.includes("parsed.hostname==='kwdks94kpr-stonne.github.io'")) errors.push('App.js: vertrauenswürdige Webadresse nicht geprüft');
if (!eas.build?.development || !eas.build?.preview) errors.push('eas.json: Test-Build-Profil fehlt');
if (!code.includes('https://kwdks94kpr-stonne.github.io/jarvis-webapp/')) errors.push('App.js: bisherige JARVIS-Zentrale nicht eingebunden');
if (!code.includes('JARVIS Lokale KI')) errors.push('App.js: bestehender KI-Kurzbefehl fehlt');
if (!Array.isArray(state.items) || !state.items.length) errors.push('Projektstatus: Projektregister fehlt');
const ids = (state.items || []).map(item => item.id);
if (new Set(ids).size !== ids.length) errors.push('Projektstatus: doppelte Projekt-IDs');
if (code.includes('BESTEHENDE JARVIS-ZENTRALE ↗')) errors.push('App.js: doppelte Start-Schaltfläche');
if (errors.length) {
  console.error('JARVIS-VORPRÜFUNG FEHLGESCHLAGEN\n' + errors.map(x => '- ' + x).join('\n'));
  process.exitCode = 1;
} else {
  console.log('JARVIS-VORPRÜFUNG: Konfiguration und bekannte Integrationspunkte vorhanden.');
  console.log('WICHTIG: Kein Build, keine iOS-Signierung, kein echter iPhone-Test durchgeführt.');
}
