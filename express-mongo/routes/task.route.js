const express = require('express');
const taskRoutes = express.Router();
let mongoose = require('mongoose')

let Task = require('../model/task.model');

//store
taskRoutes.route('/add').post(function(req,res){
    let task = new Task(req.body);
    task.save()
        .then(task => {
            res.status(200).json({'task': 'task is added sucessfully'});
        })
        .catch(err => {
            res.status(400).send('unable to save task to database');
        });
});

//get data
taskRoutes.route('/').get(function (req,res){
    Task.find(function(err,task){
        if(err)
            console.log(err);
        else{
            res.json(task);
        }
    });
});

taskRoutes.route('/:id').get(function (req,res){
    Task.findById(req.params.id, function (err, task){
        if(err)
            console.log(err);
        else{
            res.json(task);
        }
    });
});

//Update
taskRoutes.route('/update/:id').put(function (req,res){
    Task.findById(req.params.id, function(err, task){
        if(!task)
            res.status(404).send('Data is not found.')
        else{
            task.id = req.body.id;
            task.task = req.body.task;
            task.status = false;

            task.save().then(task => {
                res.json('Update complete');
            })
            .catch(err => {
                res.status(400).send('Unable to update database')
            });
        }
    });
});

//Done
taskRoutes.route('/done/:id').put(function (req,res){
    Task.findById(req.params.id, function(err, task){
        if(!task)
            res.status(404).send('Data is not found.')
        else{
            task.status = true;

            task.save().then(task => {
                res.json('Update complete');
            })
            .catch(err => {
                res.status(400).send('Unable to update database')
            });
        }
    });
});

//Delete
taskRoutes.route('/delete/:id').delete(function (req,res){
    Task.findByIdAndRemove({_id: req.params.id}, function (err, task){
        if(err)res.json(err);
        else res.json('Succesfully Removed');   
    });
});

module.exports = taskRoutes;