require("dotenv").config();

var axios = require("axios");
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var fs = require("fs");

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

// Movie-This (OMDb)
function movieThis(value) {
    if(!value){
        value = "Mr Nobody";
    }
    axios.get("https://www.omdbapi.com/?t=" + value.replace(' ', '+') + "&y=&plot=short&apikey=trilogy")
    .then(function(response) {
            var movieResults = 
                "*********************************************************************" +
                    "\nMovie Title: " + response.data.Title + 
                    "\nYear of Release: " + response.data.Year +
                    "\nIMDB Rating: " + response.data.imdbRating +
                    "\nRotten Tomatoes Rating: " + response.data.Ratings[1].Value +
                    "\nCountry Produced: " + response.data.Country +
                    "\nLanguage: " + response.data.Language +
                    "\nPlot: " + response.data.Plot +
                    "\nActors/Actresses: " + response.data.Actors;
            console.log(movieResults);
    })
    .catch(function (error) {
        console.log(error);
    });
}

// Do-What-It-Says (fs)
function doThis(value) {
    fs.readFile("random.txt", "utf8", function(error, data) {
        if (error) {
            return console.log(error);
        }
        var dataArr = data.split(",");
        console.log(dataArr);
        if (dataArr[0] === "spotify-this-song") {
            spotifySong(dataArr[1]);
        } if (dataArr[0] === "concert-this") {
            concertThis(dataArr[1]);
        } if (dataArr[0] === "movie-this") {
            movieThis(dataArr[1]);
        }
    })
}