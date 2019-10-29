require("dotenv").config();

var axios = require("axios");
var moment = require("moment");
moment().format();
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var fs = require("fs");

// Takes command line arguments for each function
var command = process.argv[2];
var value = (process.argv.slice(3)).toString();

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
    console.log(value.replace(/,/g, " "));
    axios.get("https://rest.bandsintown.com/artists/" + value.replace(/,/g, "") + "/events?app_id=codingbootcamp")
    .then(function(response) {    
        for (var i = 0; i < 5; i++) {
            var datetime = response.data[i].datetime;
            var dateArr = datetime.split("T");
            var concertResults = 
                "*********************************************************************" +
                    "\nVenue Name: " + response.data[i].venue.name + 
                    "\nVenue Location: " + response.data[i].venue.city +
                    "\nDate of the Event: " + moment(dateArr[0]).format("MM-DD-YYYY");
            console.log(concertResults);
            fs.appendFile("log.txt", "\n" + concertResults, function(err) {
                if (err) {
                    throw (err)
                }
            })
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
    console.log(value.replace(/,/g, " "));
    spotify
    .search({ type: "track", query: value.replace(/,/g, " ") })
    .then(function(response) {
        for (var i = 0; i < 5; i++) {
            var spotifyResults = 
                "*********************************************************************" +
                    "\nArtist(s): " + response.tracks.items[i].artists[0].name + 
                    "\nSong Name: " + response.tracks.items[i].name +
                    "\nPreview Link: " + response.tracks.items[i].preview_url;
                    "\nAlbum Name: " + response.tracks.items[i].album.name;
                    
            console.log(spotifyResults);
            fs.appendFile("log.txt", "\n" + spotifyResults, function(err) {
                if (err) {
                    throw (err)
                }
            })
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
    console.log(value.replace(/,/g, " "));
    axios.get("https://www.omdbapi.com/?t=" + value.replace(/,/g, "+") + "&y=&plot=short&apikey=trilogy")
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
            fs.appendFile("log.txt", "\n" + movieResults, function(err) {
                if (err) {
                    throw (err)
                }
            })
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
        var dataArr = data.split(", ");
        if (dataArr[0] === "spotify-this-song") {
            spotifySong(dataArr[1]);
        } if (dataArr[0] === "concert-this") {
            concertThis(dataArr[1]);
        } if (dataArr[0] === "movie-this") {
            movieThis(dataArr[1]);
        }
    })
}