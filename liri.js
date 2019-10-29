require("dotenv").config();

var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
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

// Concert-This (Bandsintown)
function concertThis(value) {
    axios.get("https://rest.bandsintown.com/artists/" + value + "/events?app_id=codingbootcamp")
    .then(function(response) {    
        for (var i = 0; i < response.data.length; i++) {
            var datetime = response.data[i].datetime;
            var dateArr = datetime.split('T');
            var concertResults = 
                "*********************************************************************" +
                    "\nVenue Name: " + response.data[i].venue.name + 
                    "\nVenue Location: " + response.data[i].venue.city +
                    "\nDate of the Event: " + dateArr[0];
            console.log(concertResults);
        }
    })
    .catch(function (error) {
        console.log(error);
    })
}

// Spotify-This-Song (Spotify)
function spotifySong(value) {
    if(!value){
        value = "The Sign";
    }
    spotify
    .search({ type: 'track', query: value })
    .then(function(response) {
        for (var i = 0; i < 5; i++) {
            var spotifyResults = 
                "*********************************************************************" +
                    "\nArtist(s): " + response.tracks.items[i].artists[0].name + 
                    "\nSong Name: " + response.tracks.items[i].name +
                    "\nPreview Link: " + response.tracks.items[i].preview_url;
                    "\nAlbum Name: " + response.tracks.items[i].album.name +
                    
            console.log(spotifyResults);
        }
    })
    .catch(function(err) {
        console.log(err);
    });
}