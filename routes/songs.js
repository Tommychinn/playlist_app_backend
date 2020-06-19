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
                res.send({ results });
            }
        }
    );
});

// GET individual song from database, again sort this out later

// router.get("/:id", (req, res) => {
//     const id = req.params.id;
//     res.send(
//         `This song is: ${connection.query(
//             'SELECT ?, title, artist FROM track', id,
//             (error, results) => {
//                 if (error) {
//                     console.log(`error accessing database: ${error}`);
//                 } else {
//                     res.send( results );
//                 }
//             }
//         )}`
//     );
// });

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


// Update a song, sort this out later

// router.put("/:id", (req, res) => {
//     const title = req.body.title;
//     const artist = req.body.artist;
//     const album_picture = req.body.album_picture;
//     const youtube_url = req.body.youtube_url;
//     const id = req.params.id;
//     connection.query(
//         `UPDATE TABLE track SET title = ? , artist = ? , album_picture = ? , youtube_url = ? WHERE id = ? `,
//         [title, artist, album_picture, youtube_url, id]
//     );
// });

module.exports = router;
