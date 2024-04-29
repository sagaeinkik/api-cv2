const mongoose = require('mongoose');

//Schema
const jobSchema = new mongoose.Schema({
    employer: {
        type: String,
        required: [true, 'Du måste fylla i arbetsgivare'],
    },
    title: {
        type: String,
        required: [true, 'Du måste fylla i jobbtitel'],
    },
    description: {
        type: String,
        required: [true, 'Du måste fylla i jobbeskrivning'],
    },
    startDate: {
        type: Date,
        required: [true, 'Du måste fylla i startdatum för anställningen'],
    },
    endDate: {
        type: String,
        required: false,
    },
});

const Job = mongoose.model('Job', jobSchema);

//exportera
module.exports = Job;
