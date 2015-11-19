'use strict';
var pg = require('pg');
var conString = 'postgres://yplswmlzaypleo:K065A5mYKpc1wcubhwK7dBOEsS@ec2-54-225-197-30.compute-1.amazonaws.com:5432/d3gm2fa2gt6uc4?ssl=true'



exports.queryDb = function(queryStr, parameters, then) {
  pg.connect(conString, function(err, client, done) {
    if(err) {
      return console.error('error fetching client from pool', err);
    }
    client.query(queryStr, parameters, function(err, result) {
      //call `done()` to release the client back to the pool
      done();
      if(err) {
        return then(err, null);
      }
      then(null, result);
    });
  });
};
