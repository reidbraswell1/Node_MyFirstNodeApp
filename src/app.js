console.log("Hello World!\n==========\n");

// Exercise 1 Section
console.log("EXERCISE 1:\n==========\n");

//const http = require("http");
import http from 'http';
import path from 'path';
import ejs from 'ejs';

// Create a local server to receive data from
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end("<h1>Hello World</h1>");
    //res.end(JSON.stringify({
      //data: 'Hello World!'
    //}));
  });
  
  server.listen(8000);