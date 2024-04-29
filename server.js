//Dependencies
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
//Den krävde mappnamnet på projektet för att fungera av någon anledning
const apiRouter = require('./routes/apiroutes');

//Port
const port = process.env.PORT || 3000;
//AnslutningsURL
let url = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.ltofrmk.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

//Inställningar
const app = express();
app.use(cors());
app.use(express.json());

//Anslutning
mongoose
    .connect(url)
    .then(() => {
        console.log('Hurra! Ansluten till MongoDB!');
    })
    .catch((error) => {
        console.error('Anslutning misslyckades: ' + error);
    });

/* ROUTING */
//Introduktion
app.get('/', async (req, res) => {
    res.json({
        message:
            'Välkommen till mitt API för CV:n. Du kommer behöva skriva /api innan din sökväg. Här kommer jag skriva mer information om API:et senare. ',
    });
});

app.get('/api', async (req, res) => {
    res.json({
        message:
            'Välkommen till mitt API för CV:n. Här kommer jag skriva mer information om API:et senare. ',
    });
});

//routes med syften hämtas från routes/apiroutes.js
app.use('/api/cv', apiRouter);

//Starta app
app.listen(port, (error) => {
    if (error) {
        console.error(error);
    } else {
        console.log('Ansluten till servern på port ' + port);
    }
});
