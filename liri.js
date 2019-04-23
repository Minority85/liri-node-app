require("dotenv").config();

var keys = require("./keys.js");

var fs = require("fs");

var axios = require("axios");

var Spotify = require('node-spotify-api');

var moment = require('moment');

var spotify = new Spotify(keys.spotify);

var command = process.argv[2];

var divider = "\r\n===============================================================\r\n";

if (command === "spotify-this-song") {

    var userInput = process.argv.slice(3).join(" ");

    // console.log(userInput);

    if (userInput === "") {

        spotify.search({ type: 'track', query: "The Sign", limit: 5 }, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }

            var a = data.tracks.items;

            for (var i = 0; i < a.length; i++) {

                console.log("\n========================================");
                console.log("Artist(s): " + a[i].artists[0].name);
                console.log("Song Name: " + a[i].name);
                console.log("Preview: " + a[i].preview_url);
                console.log("Album: " + a[i].album.name);
                console.log("========================================\n");

            }

            // console.log(JSON.stringify(data, null, 2));

            // console.log(a);

            fs.appendFile("log.txt", command + ", " + "The Sign" + divider, function (err) {
                if (err) throw err;
                // console.log(err);
            })
        });
    }
    else if (userInput.constructor === String) {

        spotify.search({ type: 'track', query: userInput, limit: 5 }, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }

            var a = data.tracks.items;

            for (var i = 0; i < a.length; i++) {

                console.log("\n========================================");
                console.log("Artist(s): " + a[i].artists[0].name);
                console.log("Song Name: " + a[i].name);
                console.log("Preview: " + a[i].preview_url);
                console.log("Album: " + a[i].album.name);
                console.log("========================================\n");

            }

            // console.log(JSON.stringify(data, null, 2));

            // console.log(a);

            fs.appendFile("log.txt", command + ", " + userInput + divider, function (err) {
                if (err) throw err;
                // console.log(err);
            })
        });
    }
}
else if (command === "concert-this") {

    var userInput = process.argv.slice(3).join("%20");

    // console.log(userInput);

    axios
        .get("https://rest.bandsintown.com/artists/" + userInput + "/events?app_id=codingbootcamp")
        .then(function (response) {

            // console.log(response.data);
            // console.log(userInput);

            var list = response.data;

            for (var i = 0; i < list.length; i++) {

                var time = list[i].datetime;

                var timeChange = moment(time).format('MM/DD/YYYY');

                console.log("\n========================================");
                console.log("Venue: " + list[i].venue.name);
                console.log("Location: " + list[i].venue.city + ", " + list[i].venue.region + " " + list[i].venue.country);
                console.log("Date: " + timeChange);
                console.log("========================================\n");

            }

        })
        .catch(function (error) {

            if (error.response) {

                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);

            } else if (error.request) {

                console.log(error.request);

            } else {

                console.log("Error", error.message);

            }

            console.log(error.config);
        });

    fs.appendFile("log.txt", command + ", " + userInput + divider, function (err) {
        if (err) throw err;
        // console.log(err);
    })
}
else if (command === "movie-this") {

    var userInput = process.argv.slice(3).join(" ");

    if (userInput) {
        // console.log(userInput);
        axios
            .get("https://www.omdbapi.com/?t=" + userInput + "&y=&plot=short&apikey=trilogy")
            .then(function (response) {

                // console.log(response.data);
                // console.log(userInput);

                var list = response.data;
                var ratings = list.Ratings;

                console.log("\n========================================");
                console.log("Title: " + list.Title);
                console.log("Year: " + list.Year);

                for (var j = 0; j < ratings.length; j++) {
                    if (ratings[j].Source === "Internet Movie Database") {
                        console.log("IMDB Rating: " + ratings[j].Value);
                    }
                    else if (ratings[j].Source === "Rotten Tomatoes") {
                        console.log("Rotten Tomatoes Rating: " + ratings[j].Value);
                    }
                    else {

                    }
                }

                console.log("Produced in: " + list.Country);
                console.log("Language: " + list.Language);
                console.log("Plot: " + list.Plot);
                console.log("Actors: " + list.Actors);
                console.log("========================================\n");

            })
            .catch(function (error) {

                if (error.response) {

                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);

                } else if (error.request) {

                    console.log(error.request);

                } else {

                    console.log("Error", error.message);

                }

                console.log(error.config);
            });

        fs.appendFile("log.txt", command + ", " + userInput + divider, function (err) {
            if (err) throw err;
            // console.log(err);
        })
    }
    else {

        userInput = "Mr. Nobody";

        axios
            .get("https://www.omdbapi.com/?t=" + userInput + "&y=&plot=short&apikey=trilogy")
            .then(function (response) {

                // console.log(response.data);
                // console.log(userInput);

                var list = response.data;
                var ratings = list.Ratings;

                console.log("\n========================================");
                console.log("Title: " + list.Title);
                console.log("Year: " + list.Year);

                for (var j = 0; j < ratings.length; j++) {
                    if (ratings[j].Source === "Internet Movie Database") {
                        console.log("IMDB Rating: " + ratings[j].Value);
                    }
                    else if (ratings[j].Source === "Rotten Tomatoes") {
                        console.log("Rotten Tomatoes Rating: " + ratings[j].Value);
                    }
                    else {

                    }
                }

                console.log("Produced in: " + list.Country);
                console.log("Language: " + list.Language);
                console.log("Plot: " + list.Plot);
                console.log("Actors: " + list.Actors);
                console.log("========================================\n");

            })
            .catch(function (error) {

                if (error.response) {

                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);

                } else if (error.request) {

                    console.log(error.request);

                } else {

                    console.log("Error", error.message);

                }

                console.log(error.config);
            });
            
        fs.appendFile("log.txt", command + ", " + userInput + divider, function (err) {
            if (err) throw err;
            // console.log(err);
        })
    }
}
else if (command === "do-what-it-says") {
    fs.readFile('random.txt', "utf8", (err, data) => {
        if (err) {
            console.log("err");
        }

        // console.log(data);

        var dataArr = data.split(",");

        console.log(dataArr);

        for (var i = 0; i < dataArr.length; i++) {

            if (dataArr[i] === "spotify-this-song") {
                i++
                var song = dataArr[i];

                // console.log("running");

                spotify.search({ type: 'track', query: song, limit: 1 }, function (err, data) {
                    if (err) {
                        return console.log('Error occurred: ' + err);
                    }

                    var a = data.tracks.items;

                    for (var j = 0; j < a.length; j++) {

                        console.log("\n========================================");
                        console.log("Artist(s): " + a[j].artists[0].name);
                        console.log("Song Name: " + a[j].name);
                        console.log("Preview: " + a[j].preview_url);
                        console.log("Album: " + a[j].album.name);
                        console.log("========================================\n");

                    }

                    // console.log(JSON.stringify(data, null, 2));

                    // console.log(a);
                });
            }
            else if (dataArr[i] === "movie-this") {
                i++
                var movie = dataArr[i];
                axios
                    .get("https://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy")
                    .then(function (response) {

                        // console.log(response.data);
                        // console.log(userInput);

                        var list = response.data;
                        var ratings = list.Ratings;

                        console.log("\n========================================");
                        console.log("Title: " + list.Title);
                        console.log("Year: " + list.Year);

                        for (var j = 0; j < ratings.length; j++) {
                            if (ratings[j].Source === "Internet Movie Database") {
                                console.log("IMDB Rating: " + ratings[j].Value);
                            }
                            else if (ratings[j].Source === "Rotten Tomatoes") {
                                console.log("Rotten Tomatoes Rating: " + ratings[j].Value);
                            }
                            else {

                            }
                        }

                        console.log("Produced in: " + list.Country);
                        console.log("Language: " + list.Language);
                        console.log("Plot: " + list.Plot);
                        console.log("Actors: " + list.Actors);
                        console.log("========================================\n");

                    })
                    .catch(function (error) {

                        if (error.response) {

                            console.log(error.response.data);
                            console.log(error.response.status);
                            console.log(error.response.headers);

                        } else if (error.request) {

                            console.log(error.request);

                        } else {

                            console.log("Error", error.message);

                        }

                        console.log(error.config);
                    });

            }
            else if (dataArr[i] === "concert-this") {
                i++
                var list = dataArr[i].replace('"', '').replace('"', '');
                var list1 = list.replace(" ", "%20");
                // console.log(list1);

                axios
                    .get("https://rest.bandsintown.com/artists/" + list1 + "/events?app_id=codingbootcamp")
                    .then(function (response) {

                        // console.log(response.data);
                        // console.log(userInput);

                        var list = response.data;

                        // console.log(list);

                        for (var j = 0; j < list.length; j++) {

                            var time = list[j].datetime;

                            var timeChange = moment(time).format('MM/DD/YYYY');

                            console.log("\n========================================");
                            console.log("Venue: " + list[j].venue.name);
                            console.log("Location: " + list[j].venue.city + ", " + list[j].venue.region + " " + list[j].venue.country);
                            console.log("Date: " + timeChange);
                            console.log("========================================\n");

                        }

                    })
                    .catch(function (error) {

                        if (error.response) {

                            console.log(error.response.data);
                            console.log(error.response.status);
                            console.log(error.response.headers);

                        } else if (error.request) {

                            console.log(error.request);

                        } else {

                            console.log("Error", error.message);

                        }

                        console.log(error.config);
                    });
            }
        }
    });
}