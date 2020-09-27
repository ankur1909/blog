const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

const events = [];

app.post('/events', (req,res) => {
    const event = req.body;
    events.push(event);

    // Post service
    axios.post('http://posts-clusterip-srv:8080/events', event);
    // Comments service
    axios.post('http://comments-srv:8081/events', event);
    // Query service service
    axios.post('http://query-srv:8082/events', event);
    // Moderation service
    axios.post('http://moderation-srv:8085/events', event);

    res.send({status: 'OK'})
});

app.get('/events', (req,res) => {
    res.send(events);
})

app.listen(4005, () => {
    console.log('event bus listening on 4005');
});