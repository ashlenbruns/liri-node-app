// NPM requirements
require("dotenv").config();

var axios = require('axios');
var moment = require('moment');
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var fs = require('fs');

// Command line variables
var userCommand = process.argv[2];
var userInput = process.argv.slice(3).join(' ');

if (userCommand === 'concert-this') {
    concert();
} else if (userCommand === 'spotify-this-song') {
    songSearch();
} else if (userCommand === 'movie-this') {
    movie();
} else if (userCommand === 'do-what-it-says') {
    doIt();
} else {
    console.log("Command must be one of the following: concert-this, spotify-this-song, movie-this, do-what-it-says.");
}

// Concert-this function
function concert() {
    axios.get("https://rest.bandsintown.com/artists/" + userInput + "/events?app_id=codingbootcamp").then(
        function(response) {
            if (response.data.length === 0) {
                console.log("Sorry, " + userInput + " is not on tour.")
            } else {    
            for (i=0;i<response.data.length;i++) {
            var venueName = response.data[i].venue.name;
            var venueLocation = response.data[i].venue.city + ", " + response.data[i].venue.region + " " + response.data[i].venue.country;
            var date = moment(response.data[i].datetime).format('MM/DD/YYYY');
            
            console.log(
                "\nVenue: " + venueName,
                "\nLocation: " + venueLocation,
                "\nDate: " + date + "\n"
            );
            
            var concertText = ['\nVenue: ' + venueName + '\nLocation: ' + venueLocation + '\nDate: ' + date + '\n' + '---------']
            fs.appendFile('log.txt', concertText, function(err) {
                if (err) throw err
            });
        }
    }
    }
    ).catch(function(err) {
            console.log(err);
        });
};

// Spotify-this funciton
function songSearch() {
    if (userInput === "") {
        userInput = 'The Sign Ace of Base'
    }
    spotify
    .search({ type: 'track', query: userInput, limit: 5 })
    .then(function(response) {
        for (i=0;i<response.tracks.items.length;i++) {
            var artist = response.tracks.items[i].artists[0].name;
            var songName = response.tracks.items[i].name;
            var album = response.tracks.items[i].album.name;
            var songPreview = response.tracks.items[i].preview_url;
    
        console.log(
            "\nArtist(s): " + artist,
            "\nSong Name: " + songName,
            "\nAlbum: " + album,
            "\nSong Preview: " + songPreview + "\n" 
        );

        var songText = ['\nArtist(s): ' + artist + '\nSong Name: ' + songName + '\nAlbum: ' + album + '\nSong Preview: ' + songPreview + '\n' + '---------']
        fs.appendFile('log.txt', songText, function(err) {
            if (err) throw err
        });
    }
  })
  .catch(function(err) {
    console.log(err);
  });
}

// Movie-this function
function movie() {
    if (userInput === "") {
        userInput = 'Mr. Nobody'
    }
    axios.get("http://www.omdbapi.com/?t=" + userInput + "&y=&plot=short&apikey=trilogy").then(
        function(response) {
                var title = response.data.Title;
                var releaseYear = response.data.Year;
                var rating = response.data.Rated;
                var rottenTomRating = response.data.Ratings[1].Value;
                var country = response.data.Country;
                var language = response.data.Language;
                var plot = response.data.Plot;
                var actors = response.data.Actors;

                console.log(
                    "\nMovie Title: " + title,
                    "\nRelease Year: " + releaseYear,
                    "\nRated: " + rating,
                    "\nRotten Tomatoes Rating: " + rottenTomRating,
                    "\nProduced in: " + country,
                    "\nMovie Language: " + language,
                    "\nPlot: " + plot,
                    "\nLead Actors: " + actors + "\n"
                );

                var movieText = ['\nMovie Title: ' + title + '\nRelease Year: ' + releaseYear + '\nRated: ' + rating + '\nRotten Tomatoes Rating: ' + rottenTomRating + '\nProduced In: ' + country + '\nMovie Language: ' + language + '\nPlot: ' + plot + '\nLead Actors: ' + actors + '\n' + '---------']
                fs.appendFile('log.txt', movieText, function(err) {
                    if (err) throw err
                });
            }
    ).catch(function(err) {
        console.log(err);
    });
};

// Do-what-it-says function
function doIt() {
    fs.readFile('random.txt', 'utf8', function(err, data) {
        if (err) {
            console.log(err);
        }

        var dataArray = data.split(',');
        userCommand = dataArray[0];
        userInput = dataArray.slice(1).join(' ');
        songSearch();
    });
}
