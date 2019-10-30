# liri-node-app

1. Clearly state the problem the app is trying to solve (i.e. what is it doing and why)

This app is designed to collect information on various forms of media queried, ranging from concerts to songs to movies. This app can be run directly through command line arguments, or through modifying the random.txt file and calling the do-what-it-says function.

2. Give a high-level overview of how the app is organized

The bulk of the app lies on thej liri.js page. On line 13, the "value" variable passed into each function is taken to be an array composed of every argument on the third position onwards. This eliminates the need to constrain the format on user input. Right after, the logic is broken up by switch-case statements. These allowed for different functions to be called on based on command line input. 

The concert-this function makes an axios GET request to the Bandsintown API. From there, info on all of the queried band/artist's upcoming shows are extracted. The spotify-this-song function hits the Spotify API, which has a built-in search function for developers. The movie-this function makes an axios GET request to the OMDb API for movie information. And lastly, the do-what-it-says function executes whatever's written on the "random.txt" file, with everything before the comma being the function called, and everything after being the query term.

   Each function logs its results to the same log.txt file without overwritng any existing data.

3. Give start-to-finish instructions on how to run the app
   
Clone the repository onto your computer. Using a command line, navigate to the root folder and install the packaged dependencies using the command "npm install". You are now ready to run the app.

As this is a Node app, all commands will being with the first two arguments "node liri.js". The argument in position 2 calls the desired function, while all subsequent arguments compose the value to be passed into the function:
     * "concert-this" - console.logs info on the upcoming concerts that the artist or band has scheduled;
     * "spotify-this-song" - console.logs info on the 5 best matches from various artists that are potentially the song you're trying to reach;
     * "movie-this" - console.logs info on the best match for the movie title being searched;
     * "do-what-it-says" - takes the first argument from the random.txt file (everything before the comma) as a function call, and everything past the comma as a value to be passed into the function (no argument typed into the command line after "do-what-it-says");

All queries and results are stored on log.txt.

4. Include screenshots, gifs or videos of the app functioning


5. Contain a link to a deployed version of the app
No deployment - command line app

6. Clearly list the technologies used in the app
     * node.js
     * axios
     * moment
     * Spotify node API
     * fs

7. State your role in the app development
Did everything!