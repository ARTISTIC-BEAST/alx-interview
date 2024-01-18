#!/usr/bin/node
const request = require('request');

function getMovieCharacters(movieId) {
  const url = `https://swapi.dev/api/films/${movieId}/`;

  return new Promise((resolve, reject) => {
    request(url, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        const movieData = JSON.parse(body);
        const charactersURLs = movieData.characters;

        // Fetch character names from the characters' URLs
        const charactersPromises = charactersURLs.map(characterURL =>
          new Promise((resolveChar, rejectChar) => {
            request(characterURL, (errorChar, responseChar, bodyChar) => {
              if (!errorChar && responseChar.statusCode === 200) {
                const characterData = JSON.parse(bodyChar);
                resolveChar(characterData.name);
              } else {
                rejectChar(`Error fetching character details: ${characterURL}`);
              }
            });
          })
        );

        // Resolve all character promises
        Promise.all(charactersPromises)
          .then(characters => resolve(characters))
          .catch(error => reject(error));
      } else {
        reject(`Error fetching movie details: ${url}`);
      }
    });
  });
}

function main() {
  // Check if the Movie ID is provided as a command-line argument
  if (process.argv.length !== 3) {
    console.error('Usage: ./0-starwars_characters.js <Movie ID>');
    process.exit(1);
  }

  const movieId = process.argv[2];

  // Get and print the characters for the specified movie
  getMovieCharacters(movieId)
    .then(characters => {
      characters.forEach(character => console.log(character));
    })
    .catch(error => console.error(error));
}

if (require.main === module) {
  main();
}

