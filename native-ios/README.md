# JARVIS – native iPhone-Prototyp (Expo)

## Bereits vorhandene Komponenten erhalten
- Bestehende Webzentrale unter https://kwdks94kpr-stonne.github.io/jarvis-webapp/
- iPhone-Kurzbefehl `JARVIS Lokale KI` und dessen getestete Rückgabe über Safari
- Kontrollierte Befehlsprüfung der Webzentrale

## Was dieser Stand ist
Eine **native React-Native-App** mit eigener Startansicht, animiertem Reaktor, Verknüpfung zu Apple Kurzbefehlen und einem eingebetteten Webbereich für die bestehende Zentrale. Die lokale KI ist **noch nicht nativ im App-Prozess integriert**; der Shortcut-Callback geht weiterhin nach Safari. Keine Hintergrund-Sprachsteuerung, keine automatischen Freigaben. Nicht auf realem iPhone getestet.

## Kostenlos auf iPhone mit Expo Go testen (Windows 10)
1. Node.js LTS auf dem Windows-Laptop installieren.
2. Im Ordner `native-ios` `npm install` und `npx expo start` ausführen.
3. Die kostenlose Expo-Go-App auf dem iPhone öffnen und den QR-Code aus demselben Netzwerk scannen.

Expo Go ist **nur eine Testumgebung**, keine eigene separat installierte JARVIS-App. Für eine signierte eigenständige iOS-App ist iOS-Codesignierung/Provisioning erforderlich; Expo EAS Build kann iOS in der Cloud bauen, gewöhnliche Geräte- und TestFlight-Verteilung setzt normalerweise die kostenpflichtige Apple Developer Program-Mitgliedschaft voraus. Kein kostenpflichtiger Dienst wurde aktiviert.

## Sicherheit und nächste Entwicklung
- Zuerst die native Startansicht in Expo Go testen.
- Bestehende Shortcut-Rückgabe in der eingebetteten WebView gesondert testen: der Rückweg nach Safari ist erwartbar und kein vollständiger nativer Callback.
- Für iPhone-Aktionen native Brücken nur nach Prüfung der iOS-Berechtigungen und mit expliziter Freigabe entwickeln.
- Nicht ungefragt Daten über URL-Parameter versenden, da sie in Verlauf/Server-Logs gelangen können.

## Neue Fehlerbehandlung
Die native Webzentrale zeigt bei Netzwerk- und HTTP-Fehlern einen Hinweis mit **Erneut verbinden** und **In Safari öffnen**. Diese Änderung wurde im GitHub-Quellcode vorbereitet, aber noch nicht auf einem realen iPhone ausgeführt oder überprüft. Der funktionierende Safari-Kurzbefehl bleibt unverändert.

## Verifizierter CI-Prüflauf
- Die GitHub-Actions-Vorprüfung für die native App lief erfolgreich (Lauf 39922379770).
- Die Vorprüfung kontrolliert Konfiguration und bekannte Sicherheitsmerkmale ohne Paketinstallation.
- **Sie ersetzt weder `npm install`, einen Metro-Bundle-Test noch einen iOS-Build oder Geräte-Test.**
- Für einen tatsächlichen iPhone-Test sind noch eine Entwicklungsumgebung und eine passende Installationsmethode nötig; ohne ausdrückliche Zustimmung keine kostenpflichtige Apple-Mitgliedschaft.
