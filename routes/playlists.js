const express = require('express');
const router = express.Router();
const connection = require('../conf')

//ROUTES

//GET all playlists

router.get('/', (req,res) => {
    connection.query('SELECT * FROM playlist', (error, results) => {
        if (error) {
            console.log(error)
        } else {
            res.status(200).send({results})
        }
    })
})

//GET individual playlist

router.get('/:id', (req,res) => {
    const query = "SELECT * FROM playlist WHERE id = ?;SELECT * FROM track_playlist WHERE playlist_id = ?";
    const id = req.params.id
    connection.query(query, [id, id], (error, results) => {
        if (error) {
            console.log(error)
        } else {
            res.send(results);
        }
    })
})

//POST new playlist

router.post('/', (req,res) => {
    const title = req.body.title
    const genre = req.body.genre
    connection.query('INSERT INTO playlist (title, genre) values (?, ?)', [title, genre], (error) => {
        if (error) {
            console.log(`Error submitting playlist: ${error}`)
        }
    } )
})

//GET songs from playlist

// router.get()

//POST song to playlist

router.post('/:playlist/songs/:track', (req,res) => {
    const track = req.params.track;
    const playlist = req.params.playlist;

    connection.query('SET FOREIGN_KEY_CHECKS = 0', (err) => {
        console.log(err)
    })
    connection.query('INSERT INTO track_playlist (track_id, playlist_id) values (?,?)', [track, playlist], (error) => {
        if (error) {
            console.log(`Error submitting ${song} to playlist: ${playlist}`)
        }
    })
    connection.query('SET FOREIGN_KEY_CHECKS = 1', (err) => {
        console.log(err)
    })
})


module.exports = router;