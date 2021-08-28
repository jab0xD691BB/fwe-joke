## Frontend

Das Frontend nutzt die REST-API vom Backend um sich die Daten zu holen und anzuzeigen.

## Motivation

Das Projekt ist nötig um Hausaufgabe 1 zu bestehen. Außerdem gefällt mir das Thema, das zu späteren beruflichen Zwecken nützlich sein könnte.

## Screenshots

![Alt text](/images/website.jpg?raw=true "Optional Title")

## Tech/framework/lib

- React
- REST

## Features

Die Witze können vom Frontend aus erstellt, bearbeitet, bewertet und gelöscht werden.
Außerdem kann man Witze nach der Lustigkeit auf- oder absteigend sortieren sowie
nach der Lustigkeit filtern.
Die Bewertung der Witze kann über die Smileys erfolgen oder durch den Edit-Button.
Betätigt man den Add-Button, Edit-Button oder Delete-Button erscheint ein Pop-Up Fenster, welches man durch Klicken im Hintergrund schließen kann.

## Installation

Voraussetzung ist, dass Docker lauffähig vorinstalliert ist.

1. Das Projekt vom gitlab pullen oder downloaden.
2. Shell im Projektverzeichnis öffnen.
3. Folgender Befehl eingeben:<br>

   ```console
   docker-compose up
   ```

4. Nachdem die Container erfolgreich laufen, nochmal folgender Befehl eingeben, damit die Datenbank synchronisiert wird:<br>

   ```console
   docker-compose exec -T backend npm run typeorm schema:sync
   ```

Danach lässt sich die Webseite über http://localhost:3000/ erreichen.

## Anmerkung

Aus Zeitlichen Gründen fehlt leider eine Zweite-Seite, dass ein zufälliger Witz aus einer Externen-Api holt und anzeigt.<br>
Jedoch kann man einen zufälligen Witz aus der externen-API holen und auf der Hauptseite anzeigen. Einfach die URL http://127.0.0.1:4000/api/jokeExternal/ auf einem anderen Tab oder Postman aufrufen und die Hauptseite aktualisieren.

MIT © [Joseph Acosta-Becker]()
