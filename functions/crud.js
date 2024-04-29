const Job = require('../models/jobSchema');

//Funktion för att hämta alla jobb
async function getAllJobs(req, res) {
    //Error-objekt
    let errors = {
        https_response: {
            message: '',
            code: '',
        },
        message: '',
        details: '',
    };
    try {
        let response = await Job.find({});

        //Om det är en tom array, kör 404 not found
        if (!response || response.length < 1) {
            errors.https_response.message = 'Not found';
            errors.https_response.code = 404;
            errors.message = 'No data to show';
            return res.json({ errors });
        } else {
            //Annars, visa resultatet
            return res.json({ response });
        }
    } catch (error) {
        console.log('Något gick fel vid get api/cv: ' + error);
        return res.status(500).json({ error });
    }
}

//Hämta specifikt jobb
async function getAJob(req, res) {
    const id = req.params.id;
    let errors = {
        https_response: {
            message: '',
            code: '',
        },
        message: '',
        details: '',
    };
    try {
        //Mongoose-dokumentationen rekommenderade .exec()
        let result = await Job.findById(id).exec();

        //Kolla om det finns några resultat att visa
        if (!result || result.length < 1) {
            errors.https_response.message = 'Not found';
            errors.https_response.code = 404;
            errors.message = 'No data to show';
            return res.json({ errors });
        } else {
            //Visa resultat
            return res.json({ result });
        }
    } catch (error) {
        console.log('Något gick fel vid get api/cv/:id : ' + error);
        return res.status(500).json({ error });
    }
}

//hämta jobb baserat på titel
async function getAJobTitle(req, res) {
    //error
    let errors = {
        https_response: {
            message: '',
            code: '',
        },
        message: '',
        details: '',
    };
    //Avkoda titel:
    const title = req.params.title;
    let decodedTitle = decodeURIComponent(title);
    try {
        //Möjliggör sök efter både strängar med gemener och med stor bokstav först med hjälp av Regexp
        let result = await Job.find({
            title: { $regex: new RegExp('^' + decodedTitle, 'i') },
        });

        if (!result || result.length < 1) {
            errors.https_response.message = 'Not found';
            errors.https_response.code = 404;
            errors.message = 'No data to show';
            return res.json({ errors });
        } else {
            //Visa resultat
            return res.json({ result });
        }
    } catch (error) {
        console.log('Något gick fel vid get api/cv/title/:title : ' + error);
        return res.status(500).json({ error });
    }
}

//Lägg till nytt jobb
async function addJob(req, res) {
    try {
        let newJob = await Job.create(req.body);
        return res.json({ newJob });
    } catch (error) {
        console.log('Något gick fel vid post api/cv: ' + error);
        return res.status(400).json({ error });
    }
}

//Uppdatera ett jobb
async function updateJob(req, res) {
    //error
    let errors = {
        https_response: {
            message: '',
            code: '',
        },
        message: '',
        details: '',
    };
    const id = req.params.id;
    try {
        let updatedJob = await Job.findByIdAndUpdate(id, req.body);

        if (!updatedJob) {
            errors.https_response.message = 'Not found';
            errors.https_response.code = 404;
            errors.message = 'No data to show';
            return res.json({ errors });
        } else {
            return res.json({ updatedJob });
        }
    } catch (error) {
        console.log('Något gick fel vid put api/cv/:id ' + error);
        return res.status(400).json({ error });
    }
}

//Radera ett jobb
async function deleteJob(req, res) {
    const id = req.params.id;
    try {
        let result = await Job.findOneAndDelete({ _id: id });
        return res.json({ message: 'Document with ID ' + id + ' successfully deleted', result });
    } catch (error) {
        console.log('Något gick fel vid delete api/cv/:id ' + error);
        return res.status(400).json({ error });
    }
}

//Exportera
module.exports = {
    getAllJobs,
    getAJob,
    getAJobTitle,
    addJob,
    updateJob,
    deleteJob,
};
