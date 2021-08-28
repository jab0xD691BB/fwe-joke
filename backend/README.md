## Backend

Das Backend nutzt REST-API um das Frontend mit Witzen zu versorgen.

## Motivation

Das Projekt ist nötig um Hausaufgabe 1 zu bestehen, aus Neigung und um einen persönlichen Fortschritt zu erzielen.

## Features

Mit der API können Witze aus der Datenbank gelesen, erstellt, bearbeitet oder gelöscht werden.
Außerdem kann man die Witze-Liste durch bestimmte Parameter filtern.
Des Weiteren können Witze aus einer externen-API geholt werden, die dann in der Datenbank gespeichert wird. Zusätzlich existiert ein Endpunkt worüber man die Witze als CSV-Datei downloaden kann.
Die API stellt folgende Endpunkte bereit um das CRUD System zu realisieren:<br>

Create: POST http://127.0.0.1:4000/api/joke/<br>

READ: GET http://127.0.0.1:4000/api/joke/?min_fun=1&max_fun=10<br>
&emsp;&emsp;&emsp;GET http://127.0.0.1:4000/api/joke/:id<br>
UPDATE: PUT http://127.0.0.1:4000/api/joke/:id<br>
DELETE: DELETE http://127.0.0.1:4000/api/joke/:id<br>

Externe-API: GET http://127.0.0.1:4000/api/jokeExternal/<br>
Download: GET http://127.0.0.1:4000/api/download<br>

Das Datenformat welches zum Verschicken verwendet wird ist JSON.

```javascript
{
        "titel": "test",
        "text": "beispiel",
        "id": "6858114c-aa9b-4fd3-a86f-6b43dcb3c20c",
        "createdAt": "2021-08-24T12:16:00.299Z",
        "updateAt": "2021-08-24T12:16:00.299Z",
        "visible": true,
        "funniness": 10
}
```

## Tech/framework/lib

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

4. Nachdem die Container erfolgreich laufen, wird nochmal folgender Befehl eingegeben, damit die Datenbank synchronisiert wird:<br>

   ```console
   docker-compose exec -T backend npm run typeorm schema:sync
   ```

MIT © [Joseph Acosta-Becker]()
