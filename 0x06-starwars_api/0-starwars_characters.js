#!/usr/bin/node
const request = require('request');
const movie = process.argv[2];
request(`https://swapi-api.hbtn.io/api/films/${movie}`, function (error, response, body) {
  if (error) {
    return console.log(error);
  }
  const characters = JSON.parse(body).characters;
  characters.forEach(element => {
    request(element, function (error, response, body) {
      if (error) {
        return console.log(error);
      }
      console.log(JSON.parse(body).name);
    });
  });
});
