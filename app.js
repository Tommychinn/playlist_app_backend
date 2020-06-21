const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv/config");

app.use(express.json());

app.use(
    express.urlencoded({
        extended: true,
    })
);

app.use((req, res, next) => {
    // Website you wish to allow to connect
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");

    // Request methods you wish to allow
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );

    // Request headers you wish to allow
    res.setHeader(
        "Access-Control-Allow-Headers",
        "X-Requested-With,content-type"
    );

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader("Access-Control-Allow-Credentials", true);

    // Pass to next layer of middleware
    next();
});

//IMPORT ROUTES
const songsRoute = require("./routes/songs");
const playlistsRoute = require("./routes/playlists");

app.use("/songs", songsRoute);
app.use("/playlists", playlistsRoute);
app.use(cors());

//ROUTES

app.get("/", (req, res) => {
    res.send("Welcome to songs & playlists");
});

//CONNECT TO DB

//LISTENING
app.listen(process.env.PORT || 3050, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log(`server listening on ${process.env.PORT}`);
    }
});
