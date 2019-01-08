// import your node modules
const express = require('express');
const db = require('./data/db.js');

// add your server code starting here

const server = express();
server.use(express.json());

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

server.post('/api/posts', (req, res) => {
    const postInfo = req.body;

    db.insert(postInfo)
    .then(result => {
        db.findById(result.id)
        .then(post => {
            res.status(201).send(post);
        })
        .catch(err => 
            res.status(400).send({ errorMessage: 'Please provide title and contents for the post.' }))
    })
    .catch(err => res.status(500).send({ error: "There was an error while saving the post to the database" }))
})

server.delete('/api/posts/:id', (req, res) => {
    const id = req.params.id;
    db.findById(id)
    .then(post => {
        if(post.length) {
            db.remove(id).then(count => {
                res.status(200).send(post);
            });
        } else {
            res
            .status(404).send({ message: "The post with the specified ID does not exist." })
        }
    })
    .catch(err => res.status(500).send({ error: "The post could not be removed" }))
})

server.put('/api/posts/:id', (req, res) => {
    const id = req.params.id;
    const changes = req.body;

    db.findById(id)
    .then(post => {
        if(post.length) {
            db.update(id, changes).then(count => {
                res.status(200).send(changes);
            }) .catch(err => res.status(400).send({ errorMessage: "Please provide title and contents for the post." }))
        } else {
            res
            .status(404).send({ message: "The post with the specified ID does not exist." })
        }
    })
    .catch(err => res.status(500).send({ error: "The post information could not be modified." }))
})


server.listen(5000, () => console.log('server is running'));