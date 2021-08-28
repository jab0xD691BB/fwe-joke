## Hausaufgabe

Das Projekt ist eine Witze-Webseite. Diese können als Liste oder einzeln angezeigt werden. Außerdem kann ein Witz hinzugefügt, bearbeitet, bewertet oder gelöscht werden.
Die Witze werden mittels REST-API vom Backend geholt.

## Motivation

Hausaufgabe.

## Screenshots

![Alt text](/images/website.jpg?raw=true "Optional Title")

## Tech/framework/lib

- React
- Express
- Node
- MySQL
- REST

## Installation

Vorraussetzung ist, dass Docker lauffähig vorinstalliert ist.

1. Das Projekt vom gitlab pullen oder downloaden.
2. Shell im Projektverzeichnis öffnen.
3. Folgender Befehl eingeben:<br>

   ```console
   docker-compose up
   ```

4. Nachdem die Container erfolgreich laufen nochmal folgender Befehl eingeben, damit die Datenbank synchronisiert wird:<br>

   ```console
   docker-compose exec -T backend npm run typeorm schema:sync
   ```

MIT © [Joseph Acosta-Becker]()
