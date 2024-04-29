# API-CV 2

Av S.E.K för DT207G

## Information

API:et använder MongoDB som databashanterare. Det är framtaget med NodeJS/Express och använde Mongoose istället för MongoDB för framtagning.  
Dotenv har använts för att dölja variabler med känslig information. De är:

```
PORT=YOUR_PORT
DB_USERNAME=YOUR_DB_USERNAME
DB_PASSWORD=YOUR_DB_PASSWORD
DB_NAME=YOUR_DB_NAME
```

Funktionalitet för kommunikationen med databasen ligger i `functions/crud.js`.  
Modell för schemat ligger i `models.jobSchema.js`.  
Router ligger i `routes.apiroutes.js`.

## Installation

Det finns ingen install.js i det här projektet då MongoDB automatiskt skapar en kollektion som anges i URL:en till databasen om kollektionen inte redan finns, och NoSQL kräver inte fördefinierade scheman.

Istället finns `models/jobSchema.js` som använts i API:et för att validera input och strukturera data.

## Användning

API:et nås på `url/api/cv` och kan ha följande queries utöver det:
| Metod | Ändpunkt | Beskrivning |
| ------ | -------- | ----------|
| GET | / | Hämtar all data tillgänglig |
| GET | /:id | Hämtar specifik data baserat på ID |
| GET | /title/:title | Hämtar specifik data baserat på jobbtitel (Måste vara URI-kodat) |
| POST | / | Lägger till nytt dokument i kollektionen | 
| PUT | /:id | Uppdaterar ett specifikt dokument | 
| DELETE | /:id | Raderar ett specifikt dokument |

### Exempel

Hitta ett jobb baserat på titel:
`<host>/api/cv/title/astrofysiker`  
Resultat:

```
{
  "result": [
    {
      "_id": "662fd924667307a170d15557",
      "employer": "NASA",
      "title": "Astrofysiker",
      "description": "Rymdnörd",
      "startDate": "1971-08-20T00:00:00.000Z",
      "__v": 0
    }
  ]
}
```
