const Joi = require('joi')
const express = require('express');
const app = express();

app.use(express.json());

courses = [
    {id:1, name: 'first_Course'},
    {id:2, name: 'second_Course'},
]

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/api/courses', (req, res) => {
    res.send(courses);
}); 

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send('not found');
    res.send(course);
});

app.post('/api/courses', (req, res) => {
    const { error } = validateCourse(req.body);

    if (error) return res.status(400).send(error.details[0].message);
    

    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(courses);
});

app.put('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('not found');

    const { error } = validateCourse(req.body);

    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    course.name = req.body.name;
    res.send(course);
});

app.delete('/api/courses/:id', (req, res) => {

    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('not found');

    const index = courses.indexOf(course);
    courses.splice(index, 1);

    res.send(course);

});

function validateCourse (course) {  
    const schema = {
        name: Joi.string().min(3).required(),
    };

    return Joi.validate(course, schema);
}

const port = process.env.port || 3000;
app.listen(port, () => {
    console.log(`listeing in ${port}...`); 
});