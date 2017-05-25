const express = require('express');
const router = express.Router();
const config = require('../config/database');
const Qualification = require('../models/qualification');
const utc = new Date().toJSON().slice(0,10).replace(/-/g,'/');
//Add Qualification
router.post('/addnew', (req, res, next) => {
    "use strict";
    let newQualification = new Qualification({
        qualificationName: req.body.qualificationName,
        year: req.body.year,
        schoolCollegeName: req.body.schoolCollegeName,
        university: req.body.university,
        userName: req.body.userName,
        dateCreated: req.body.dateCreated,
        dateModified: req.body.dateModified
    });
    Qualification.addQualification(newQualification, (err, qualification) => {
        if (err) {
            res.json({ success: false, msg: 'Failed to add new Qualification' });
        } else {
            res.json({ success: true, msg: 'New Qualification added succesfully' });
        }
    });
});

//Get all qualifications for a user
router.post('/getallqualifications', (req, res, next) => {
    "use strict";
    const userName = req.body.userName;
    Qualification.getAllQualifications(userName, (err, qualifications) => {
        if (err) {
            res.json({ success: false, msg: 'Failed to retrieve Qualifications', qualification: null});
        } else {
            res.json({ success: true, msg: 'All Qualifications retrieved succesfully', qualification: qualifications });
        }
    });
});

//Update qualification
router.post('/updateQualification', (req, res, next)=>{
    "use strict";
    let updateQualification = new Qualification({
        _id: req.body._id,
        qualificationName: req.body.qualificationName,
        year: req.body.year,
        schoolCollegeName: req.body.schoolCollegeName,
        university: req.body.university,
        userName: req.body.userName,
        dateCreated: req.body.dateCreated,
        dateModified: req.body.dateModified
    });
    //Qualification
    Qualification.updateQualification(updateQualification, (err, qualification) => {
        if (err) {
            res.json({ success: false, msg: 'Failed to update Qualification' });
        } else {
            res.json({ success: true, msg: 'Qualification updated succesfully' });
        }
    });
});

//Remove qualification
router.post('/removeQualification', (req, res, next)=>{
    "use strict";
    let removeQualification = new Qualification({
        _id: req.body._id,        
        userName: req.body.userName
    });
    //Qualification
    Qualification.removeQualification(removeQualification, (err, qualification) => {
        if (err) {
            res.json({ success: false, msg: 'Failed to remove Qualification' });
        } else {
            res.json({ success: true, msg: 'Qualification removed succesfully' });
        }
    });
});

module.exports = router;