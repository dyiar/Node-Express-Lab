// import your node modules
const express = require('express');
const db = require('./data/db.js');

// add your server code starting here

const server = express();

server.get('/api/posts', (req, res) => {
    db.find()
    .then(posts => {
        res.status(200).send({ posts });
    })
    .catch(err => {
        res.send(500).send({ error: "The posts information could not be retrieved." });
    })
})

server.get(`/api/posts/:id`, (req, res) => {
    const id = req.params.id;
    db.findById(id)
    .then(post => {
        if (post.length) {
            res.status(200).send({ post });
        } else {
            res.status(404).send({ message: "The post with the specified ID does not exist." });
        }
    })
    .catch(err => {
        res.status(500).send({ error: "The post information could not be retrieved." })
    })
})


server.listen(5000, () => console.log('server is running'));