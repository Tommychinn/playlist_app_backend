const express = require('express');
const app = express();
require('dotenv/config');

app.use(express.json());

app.use(express.urlencoded({
  extended: true
}));


//IMPORT ROUTES
const songsRoute = require('./routes/songs')
const playlistsRoute = require('./routes/playlists')

app.use('/songs', songsRoute)
app.use('/playlists', playlistsRoute)

//ROUTES

app.get('/', (req,res) => {
    res.send('Welcome to songs & playlists')
})


//CONNECT TO DB


//LISTENING
app.listen(process.env.PORT || 3050, (err) => {
    if (err) {
        console.log(err)
    } else {
        console.log(`server listening on ${process.env.PORT}`)
    }
});