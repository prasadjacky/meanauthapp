const mongoose = require('mongoose');
const config = require('../config/database');
const autoIncrement = require('mongoose-auto-increment');
var connection = mongoose.createConnection(config.database);

autoIncrement.initialize(connection);

const QualificationSchema = mongoose.Schema({
    qualificationName: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    schoolCollegeName: {
        type: String,
        required: true
    },
    university: {
        type: String
    },
    userName: {
        type: String,
        required: true
    },
    dateCreated: {
        type: Date
    },
    dateModified: {
        type: Date
    }
});

QualificationSchema.plugin(autoIncrement.plugin, {
    model: 'Qualification',
    field: '_id',
    startAt: 1,
    incrementBy: 1
});
const Qualification = module.exports = mongoose.model('Qualification', QualificationSchema);

module.exports.getAllQualifications = function () {
    Qualification.find((err, qualifications) => {
        if (err) return console.log(err);
        console.log(qualifications);
    });
}

module.exports.addQualification = function (newQualification, callback) {
    newQualification.save(callback);
}

module.exports.getAllQualifications = function (userName, callback) {
    const query = { userName: userName };
    return Qualification.find(query, callback);
}

module.exports.updateQualification = function (qualification, callback) {
    const query = { userName: qualification.userName, _id: qualification._id };
    Qualification.findOne(query, function (err, doc) {
        if (err) throw err;
        else {            
            console.log('Doc: ' + doc);
            if (doc != null) {
                doc.qualificationName = qualification.qualificationName;
                doc.year = qualification.year;
                doc.schoolCollegeName = qualification.schoolCollegeName;
                doc.university = qualification.university;
                doc.dateModified = qualification.dateModified;
                doc.save(callback);
            }else{
                return;
            }
        }
    });
}
module.exports.removeQualification = function (qualification, callback) {
    const query = { userName: qualification.userName, _id: qualification._id };
    Qualification.findOne(query, function (err, doc) {
        if (err) throw err;
        else {            
            console.log('Doc: ' + doc);
            if (doc != null) {
                doc.remove(callback);
            }else{
                return;
            }
        }
    });
}