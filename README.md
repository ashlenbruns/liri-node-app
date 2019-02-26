# liri-node-app

## Liri is to node as Siri is to Apple.

Liri is a Language Interpretation and Recognition Interface. You will need to do a ```npm install``` before experiencing the wonders of Liri. Try it out! 

### HOW TO USE LIRI

Liri runs on four basic commands:
- ```concert-this```
- ```spotify-this-song```
- ```movie-this```
- ```do-what-it-says```

Open your terminal and run one of the following:
1. ```node liri.js concert-this <artist/band name here>```
   - This command retrieves data from the Bands in Town Artist Events API and outputs Venue, Venue Location and Date.
   
2. ```node liri.js spotify-this-song <song name here>```
   - This command retrieves data from the Spotify API and outputs Artist, Album, and Song Name.
   
3. ```node liri.js movie-this <movie name here>```
   - This command retrieves data from the OMDB API and outputs Title, Release Year, Rating, Rotten Tomatoes Review, Country, Language, Plot and Actors.
   
4. ```node liri.js do-what-it-says```
   - This command retrieves data from the random.txt file and uses that to call one of Liri's commands.




