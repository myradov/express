// import express from 'express';
const Joi = require('@hapi/joi');
const express = require('express');
const app = express();

app.use(express.json());

const courses = [
    { id: 1, name: 'course1'},
    { id: 2, name: 'course2'},
    { id: 3, name: 'course3'}
];

const lectures = [
    { id: 1, name: 'Math', prof: 'John Doe'},
    { id: 2, name: 'Chemistry', prof: 'Jane Doe'},
    { id: 3, name: 'Biology', prof: 'Dr. Matt'},
    { id: 4, name: 'Computer Science', prof: 'JP Cash'}
]

const profs = [
    { id: 1, name: 'John Doe'},
    { id: 2, name: 'Jane Doe'},
    { id: 3, name: 'Dr. Matt'},
    { id: 4, name: 'JP Cash'}
];


//courses



app.get('/', (req, res) => {
    res.send("Hello World");
});
//get all the courses GET
app.get('/api/courses', (req, res) => {
    res.send(courses);
})
//get one course GET
app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(e => e.id === parseInt(req.params.id));
    if(!course) res.status(404).send('The course with the given id was not found');
    res.send(course);
})
//add to courses POST
app.post('/api/courses', (req, res) => {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });
    const result = schema.validate(req.body)
    console.log(result);

    if(result.error){
        res.status(400).send(result.error.details[0].message);
        return;
    }
    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
     courses.push(course);
     res.send(course);
})
//update the course PUT
app.put('/api/courses/:id', (req,res) => {
    //Look up the course
    //If not existing return 404
    const course = courses.find(e => e.id === parseInt(req.params.id));
    if(!course) res.status(404).send("The course wiht the given id wasn't found");
    
    //Otherwise validate the course
    //If invalid, return 400 - Bad request
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });
    const result = schema.validate(req.body)
    
    if(result.error){
        res.status(400).send(result.error.details[0].message);
        return
    }
    //Update the course
    //Return the updated course
    course.name = req.body.name;
    res.send(course);
})

// lectures
//get all the lectures
app.get('/api/lectures', (req, res) => {
    res.send(lectures);
})
//get one lecture
app.get('/api/lectures/:id', (req, res) => {
    const lecture = lectures.find(e => e.id === parseInt(req.params.id));
    if(!lecture) res.status(404).send('The lecture was not found');
    res.send(lecture);
})

//add to lectures POST
app.post('/api/lectures', (req,res) => {
    const schema = Joi.object({
        name: Joi.string().min(2).required(),
        prof: Joi.string().required()
    });
    const result = schema.validate(req.body)
    
    if(result.error){
        res.status(400).send(result.error.details[0].message);
        return;
    }
    
    const lecture = {
        id: lectures.length + 1,
        name: req.body.name,
        prof: req.body.prof
    }
    lectures.push(lecture);
    res.send(lecture);
})









// profs
app.get('/api/profs', (req, res) => {
    res.send(profs);
})

app.get('/api/profs/:id', (req, res) => {
    const prof = profs.find(e => e.id === parseInt(req.params.id));
    if(!prof) res.status(404).send('The prof was not found')
    res.send(prof)
})

app.post('/api/profs', (req,res) => {
    const schema = Joi.object({
        name: Joi.string().min(2)
    })
    const result = schema.validate(req.body)

    if(result.error){
        res.status(400).send(result.error.details[0].message);
        return;
    }
    const prof = {
        id: profs.length + 1,
        name: req.body.name
    }
    profs.push(prof);
    res.send(prof);
})







const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`running on port ${port}`));
