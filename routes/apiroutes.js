const express = require('express');
const apiRouter = express.Router();
//Importera funktionerna från CRUD
const {
    getAllJobs,
    getAJob,
    getAJobTitle,
    addJob,
    updateJob,
    deleteJob,
} = require('../functions/crud');

//API-routes med funktioner från functions/crud.js
apiRouter.get('/', getAllJobs);
apiRouter.get('/:id', getAJob);
apiRouter.get('/title/:title', getAJobTitle);
apiRouter.post('/', addJob);
apiRouter.put('/:id', updateJob);
apiRouter.delete('/:id', deleteJob);

//Exportera apiRouter för användning i server.js
module.exports = apiRouter;
