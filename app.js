const express = require('express');
const app = express();
const connection = require('./conf')

app.use(express.json());

app.use(express.urlencoded({
  extended: true
}));


//IMPORT ROUTES
const songsRoute = require('./routes/songs')

app.use('/songs', songsRoute)

//ROUTES




//CONNECT TO DB


//LISTENING
app.listen(8080, (err) => {
    if (err) {
        console.log(err)
    } else {
        console.log('server listening on 8080')
    }
});