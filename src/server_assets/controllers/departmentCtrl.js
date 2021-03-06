const mongoose = require('mongoose');
const Department = require('../models/Department.js');
const Company = require('../models/Company.js');

module.exports = {

  newDepartment(req, res) {
    console.log("POST - ADD DEPARTMENT ENDPOINT", req.body);
    const newDepartment = new Department(req.body);
    console.log("COMPANY ID", req.params.companyid);
    Company
          .findOne({
            _id: req.params.companyid
          })
          .exec()
          .then(function(result) {
            console.log(result);
            result.departments.push(newDepartment._id);
            result.save();
            // console.log(result);
          });
    newDepartment.save().then((result) => {
      return res.json(result);
    }).catch((err) => {
      return res.status(500).end();
    });
  },

  oneDepartment(req,res) {
    console.log("GET - DEPARTMENT ID: ", req.params.id);
    Department.findById(req.params.id).exec().then((department) => {
      return res.json(department);
    }).catch((err) => {
      return res.status(500).end();
    });
  },

  editDepartment(req,res) {
    console.log("PUT - EDIT DEPARTMENT ID: ", req.params.id);
    Department.update({_id: req.params.id}, req.body).then(() => {
      return res.status(200).end();
    }).catch((err) => {
      return res.status(500).end();
    });
  },

  deleteDepartment(req,res) {
    console.log('DELETE - DEPARTMENT ID: ', req.params.id);
    Department.remove({_id: req.params.id}, req.body).then(() => {
      return res.status(200).end();
    }).catch((err) => {
      return res.status(500).end();
    });
  },

  allDepartments(req, res) {
    console.log('GET - ALL DEPARTMENTS ENDPOINT');
    Department.find().exec().then((departments) => {
      return res.json(departments);
    }).catch((err) => {
      console.log(err);
      return res.status(500).end();
    });
  }

};
