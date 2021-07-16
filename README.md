# Geburtstagskalender

## Initial Setup

1. Installieren eines Node-Servers:
   - [Node-Installer herunterladen](https://nodejs.org/en/download/) (für die Entwicklung verwendet wurde v16.4.2, die Funktionalität ist somit für diese Version verifiziert)
   - Im Installations-Wizard ebenfalls **npm** installieren
   - (alternativ Installation über lokalen Packagemanager)

2. Herunterladen der benötigten Packages
   - CLI öffnen
   - in den Projekt-Ordner navigieren
   - dort den Subordner **backend** aufrufen (`cd backend`)
   - `npm install` ausführen

3. Applikation starten
   - im **backend** Ordner: `npm start` oder `node server.js`

4. Localhost aufrufen
   - Browser öffnen
   - als URL [localhost:3000](http://localhost:3000/) aufrufen

---

## Projektstruktur

Das Projekt ist in zwei Teile gegliedert:
- Frontend &
- Backend.

### Server
Zwecks einer dynamischen Interaktion mit der Web-Applikation, die zudem das persistente Speichern von Daten erlauben soll, konnte hier nicht mit statischen XML-Dateien gearbeitet werden.
Daraus entstand die Notwendigkeit neben einer reinen Frontend-Repräsentation einen Backend-Server mit Datenbankanbindung einzurichten.
Die Entscheidung viel auf einen Express-Server auf Basis von Node.js.
Diese beiden Komponenten wurden explizit dafür entwickelt, Web-Server mit wenig Aufwand erstellen zu können.

### Datenbank
Aufgrund der simplen Struktur und Möglichkeit der einfachen Einbindung in Node.js viel die Wahl der Datenbank auf SQLite3.
Um diese nutzen zu können ist lediglich ein Node-Modul erfoderlich, ansonsten ist keine weitere Installation nötig.
Der Datenbank dient eine einfache Datei als Speicher (hier: backend/db.sqlite).
Das Projekt wird ohne eine Datenbank - also blanko, ohne Einträge - ausgeliefert.
Soll der Dienst zurückgesetzt werden, reicht es aus

1. den Server zu stoppen (Strg + C)
2. die Datenbank-Datei `backend/db.sqlite` zu löschen
3. den Server zu starten, wie in [Initial Setup](#initial-setup) beschrieben.

### Anbindung: Frontend - Backend
Anfragen des Nutzers werden an den Server geleitet.
Als Response generiert der Server dynamisch eine XML-Datei.
Welche XML-Datei generiert wird, ist abhängig vom angefragten Pfad und den Gegebenheiten, wie zum Beispiel dem aktuellen Tag oder dem aktuellen/vom Nutzer gewählten Monat.
Der Server entscheidet kontextabhängig, welcher DTD die generierte XML-Datei entsprechen muss und versieht letztere mit einer Referenz auf ein XSLT-Stylesheet.
Die generierte XML-Datei wird nun als Response zurückgesendet.
Erfolgt die Anfrage über einen XSLT-fähigen Browser, wird mittels der Stylinginformationen die Website aus der empfangenen XML-Datei geliefert.
Die XSLT-Dateien liegen hierbei ebenfalls auf dem Server, in einem eigens dafür angelegten Ordner, welcher als Pfad vom Server angefragt werden kann.
Die rohen XML-Dateien, die der Browser empfängt, können auf Wunsch über die **view-source** Funktion eingesehen werden.
(In Firefox oder Chrome basierten Browsern einfach vor die URL `view-source:` setzen.)

![Struktur](https://user-images.githubusercontent.com/85650505/125986840-e4319d4b-d49c-4c9d-9357-f2d85c411192.png)
