## Project title

Das Projekt ist eine Witze-Webseite. Diese können als Liste oder einzeln angezeigt werden. Außerdem kann ein Witz hinzugefügt, bearbeitet, bewertet oder gelöscht werden.
Die Witze werden mittels REST-API vom Backend geholt.

## Motivation

Hausaufgabe.

## Screenshots

![Alt text](/images/website.jpg?raw=true "Optional Title")

## Tech/framework used

- React
- Express
- Node

## Installation

1. Shell öffnen
2. Shellpfad: In Projektverzeichnis wechseln
3. Folgender eingeben:<br>
   &nbsp;docker-compose -f start.yml up
4. Nachdem die Container erfolgreich laufen nochmal folgender Befehl eingeben, damit die Datenbank synchronisiert wird:<br>
   &nbsp;docker-compose exec -T backend npm run typeorm schema:sync

A short snippet describing the license (MIT, Apache etc)

MIT © [Yourname]()
