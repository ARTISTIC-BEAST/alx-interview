#!/usr/bin/node
const request = require('request');

const movie = process.argv[2];


function doRequest() {
  return new Promise(function (resolve, reject) {
    request(`https://swapi-api.hbtn.io/api/films/${movie}`, function (error, response, body) {
      if (!error && response.statusCode == 200) {

        resolve(JSON.parse(body).characters);
      } else {
        reject(error);
      }

    });
  })
}

function doRequest2(characters) {
  return new Promise(function (resolve, reject) {
    request(characters, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        resolve(JSON.parse(body));
      } else {
        reject(error);
      }

    });
  })
}


(async () => {
  const re = await doRequest();

  for (const element of re) {
    let res = await doRequest2(element);
    console.log(res.name);
  }
})();
