const express = require('express');
const router = express.Router();
const connection = require('../conf')

//ROUTES

router.get('/', (req,res) => {
    connection.query('SELECT * FROM playlist', (error, results) => {
        if (error) {
            console.log(error)
        } else {
            res.status(200).send({results})
        }
    })
})

router.post('/', (req,res) => {
    const title = req.body.title
    const genre = req.body.genre
    connection.query('INSERT INTO playlist (title, genre) values (?, ?)', [title, genre], (error) => {
        if (error) {
            console.log(`Error submitting playlist: ${error}`)
        }
    } )
})

module.exports = router;