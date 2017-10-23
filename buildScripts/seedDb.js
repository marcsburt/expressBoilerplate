
/* This script generates mock data for local development.
   This way you don't have to point to an actual API,
   but you can enjoy realistic, but randomized data,
   and rapid page loads due to local, static data.
 */

/* eslint-disable no-console */

import jsf from 'json-schema-faker';
import { schema } from './seedSchema';
// import fs from 'fs';
import http from 'http';

const json = jsf(schema);

console.log(json.users);

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/api/examples',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  }
}


json.users.forEach(function (e) {
  let d = JSON.stringify(e);

  var req = http.request(options, res => {
    console.log('Status: ' + res.statusCode);
    console.log('Headers: ' + JSON.stringify(res.headers));
  })

  req.on('error', e => {
    console.log('problem with request:' + e.message);
  })

  req.write(d)
  req.end();
});
