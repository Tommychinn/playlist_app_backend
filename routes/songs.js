const express = require("express");
const router = express.Router();
const connection = require("../conf");

//ROUTES

router.get("/", (req, res) => {
    connection.query(
        "SELECT id, title, artist FROM track",
        (error, results) => {
            if (error) {
                console.log(`error accessing database: ${error}`);
            } else {
                res.send({results});
            }
        }
    );
});

// GET individual song from database

router.get("/:id", (req, res) => {
    const id = req.params.id;
    connection.query(
        "SELECT id, title, artist FROM track WHERE id=?",
        id,
        (error, results) => {
            if (error) {
                console.log(`error accessing database: ${error}`);
            } else {
                res.send({ results });
            }
        }
    );
});

// POST song into database

router.post("/", (req, res) => {
    const title = req.body.title;
    const artist = req.body.artist;
    const album_picture = req.body.album_picture;
    const youtube_url = req.body.youtube_url;
    connection.query(
        "INSERT INTO track (title, artist, album_picture, youtube_url) values (?, ?, ?, ?)",
        [title, artist, album_picture, youtube_url]
    );
});

//UPDATE songs

router.put("/:id", (req, res) => {
    const title = req.body.title;
    const artist = req.body.artist;
    const album_picture = req.body.album_picture;
    const youtube_url = req.body.youtube_url;
    const id = req.params.id;
    connection.query(
        "UPDATE track SET title = ? , artist = ?, album_picture = ?, youtube_url = ? WHERE id = ?",
        [title, artist, album_picture, youtube_url, id]
    );
});

module.exports = router;
