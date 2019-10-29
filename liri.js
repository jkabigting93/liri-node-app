require("dotenv").config();

var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);

var axios = require("axios");

// Takes command line arguments for each function
var command = process.argv[2];
var value = process.argv[3];

// Switch case logic to separate logic for each function
switch (command) {
    case "concert-this":
        concertThis(value);
        break;
    case "spotify-this-song":
        spotifySong(value);
        break;
    case "movie-this":
        movieThis(value);
        break;
    case "do-what-it-says":
        doThis(value);
        break;
};