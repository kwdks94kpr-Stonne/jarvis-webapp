# JARVIS – ausschließlich iPhone, ohne Laptop

## Geprüfter Ansatz: Expo Snack
Expo Snack (https://snack.expo.dev/) kann React-Native-Code im Browser bündeln und in Expo Go auf iOS ausführen. Dies ist ein **möglicher kostenloser Prototyp-Test**, keine Installation einer unabhängigen signierten JARVIS-App.

## Nötige technische Anpassung
- Ausgangsbasis bleibt `native-ios/App.js` im vorhandenen Entwicklungszweig.
- Für einen Snack-Test müssen React-Native-Dateien und Abhängigkeiten passend in ein Snack-Projekt übernommen werden; insbesondere `react-native-webview` ist im jeweiligen Expo-Go-SDK zu prüfen.
- `expo-dev-client` ist ausschließlich für separate Entwicklungsbuilds gedacht, nicht für Expo Go/Snack.
- Kein GitHub-Projekt, keine Apple-Kurzbefehle und keine produktive JARVIS-Webseite ungefragt verändern.
- Keine persönlichen Daten, Token, Antworten oder API-Schlüssel in einen öffentlichen Snack übernehmen.

## Tatsächliche Prüfung steht noch aus
- Snack wurde bislang **nicht** aus unserem App-Code erstellt, ausgeführt oder am iPhone getestet.
- Expo Go und Expo Snack müssen mit einer kompatiblen Expo-SDK-Version funktionieren.
- Auf iOS können Kurzbefehls-URL-Schemata oder das Verlassen von Expo Go anders reagieren als in einer signierten eigenen App.
- Selbst nach einem erfolgreichen Snack-Test fehlen für eine eigenständige iOS-App native Kompilierung, Apple-Signierung und Geräteinstallation.

## Erst bei Bedarf: minimale iPhone-Aktion
1. Auf dem iPhone Expo Snack in Safari öffnen.
2. Die passende Testversion in Expo Go starten.
3. Das Ergebnis und etwaige Fehlermeldungen zurückmelden.

**Status:** Technischer Testweg recherchiert, aber kein Snack-Projekt veröffentlicht; keine zusätzlichen Kosten ausgelöst.
