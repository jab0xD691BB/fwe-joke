## Frontend

Das Frontend nutzt die REST-API um sich die Daten vom Backend zu holen und anzuzeuigen.

## Motivation

Das Projekt ist nötig um Hausaufgabe 1 zu bestehen.

## Screenshots

![Alt text](/images/website.jpg?raw=true "Optional Title")

## Tech/framework/lib

- React
- REST

## Features

Die Witze können vom Frontend aus erstellt, bearbeitet, bewertet und gelöscht werden.
Außerdem kann man Witze nach der Lustigkeit auf- oder absteigend sortieren sowie
nach der Lustigkeit filtern.
Die Bewertung der Witze kann über die Smileys erfolgen oder durch den Bearbeiten-Button.
Betätigt man den Add-Button, Edit-Button oder Delete-Button erscheint ein Pop-Up Fenster welches man durch klicken im Hintergrund schließen kann.

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

Danach lässt sich die Webseite über http://localhost:3000/ erreichen.

MIT © [Yourname]()
