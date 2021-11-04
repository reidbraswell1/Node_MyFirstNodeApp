console.log("Hello World!\n==========\n");

// Exercise 1 Section
console.log("EXERCISE 1:\n==========\n");

//const http = require("http");
import http from 'http';
import url from 'url';
import querystring from 'querystring';
import fs from 'fs';
import path from 'path';
import ejs from 'ejs';

// Create a local server to receive data from
const server = http.createServer((req, res) => {
    //res.writeHead(200, { 'Content-Type': 'text/html' });
    //res.end(JSON.stringify({
      //data: 'Hello World!'
    //}));
    /*
    router.css(req, res);
    router.home(req, res);
    router.user(req, res);
    */
    /*
    const url = req.url;
    console.log(url);
    if(url == '/about') {
      res.end("<h1>Hello World</h1>");
    }
    else {
      res.end("<h1>Invalid URL");
    }
    */
    let htmlFile = '';
    let type = '';
    let urlToRoute = '';
    if(req.url.indexOf('?') == -1) {
      urlToRoute = req.url;
    }
    else {
      urlToRoute = (req.url).substring(0,req.url.indexOf("?"));
    }
    switch(urlToRoute) {
      case '/about':
        //res.end("<h1>Hello World</h1>");
        htmlFile = 'index.ejs'
        type = 'text/html';
        break;
      case '/form-submission':
        // Fill in
        switch(req.method) {
          case "POST":
            console.log("Form Submission Method = POST");
            let body = '';
        
            // very important to handle errors
            req.on('error', (err) => {
              if(err) {
                res.writeHead(500, {'Content-Type': 'text/html'});
                res.write('An error occurred');
                res.end();
              }
            });
            // read chunks of POST data
            req.on('data', chunk => {
              body += chunk.toString();
            });
            // when complete POST data is received
            req.on('end', () => {
            // use parse() method
              body = querystring.parse(body);
              console.log(body);
              console.log(body.name);

            // rest of the code
          });
          case "GET":
            console.log("Form Submission Method = GET");
            console.log(querystring.parse(req.url));
        }
        const queryObject = url.parse(req.url,true).query;
        console.log("Query Object");
        console.log(queryObject);
      case '/styles/indexStyle.css':
        console.log("correct");
        htmlFile = 'indexStyle.css';
        type = 'text/css';
        break;
      default:
        //res.end("<h1>Invalid URL");
        console.log("oops");
        console.log(req.url);
        console.log(querystring.parse(req.url));
        htmlFile = 'oops.html';
        type = 'text/html';
        break;
    }

    if(htmlFile) {
		  render(res, req, htmlFile, type);
    }
    function render(res,req, htmlFile, type) {
        switch (type) {
          // Serve a html file
          case 'text/html':
            fs.stat(`./views/${htmlFile}`, (err, stats) => {
              res.statusCode = 200;
              // Dont set content type if using ejs
              //res.setHeader('Content-Type', 'text/html');
              //console.log(err);
              console.log(stats);
              if(stats) {
                const template = fs.readFileSync(`./views/${htmlFile}`,'utf-8');
                const renderedTemplate = ejs.render(template,{title:"apple"});
                console.log("here1");
                //fs.createReadStream(`./views/${htmlFile}`).pipe(res);
                res.end(renderedTemplate);
                console.log("here2");
              }
              else {
                res.statusCode = 404;
                res.end('<h1>Sorry, page not found!</h1>');
              }
              console.log("here3");
            });
            break;
          // Serve a css file
          case 'text/css':
            console.log("here css");
            console.log(`htmlFile=${htmlFile}`)
            let fileStream = fs.createReadStream(`./styles/${htmlFile}`, "utf-8");
            let css = fs.readFileSync(`./styles/${htmlFile}`, "utf-8");
            console.log(`css=${css}`);
            //console.log(fileStream);
            res.writeHead(200, {"Content-Type": "text/css"});
            res.end(css);
            //fileStream.pipe(res);
            break;
        }
            /*
            if(req.url.match("\.css$")){
              var cssPath = path.join(__dirname, 'public', req.url);
              console.log(cssPath);
              var fileStream = fs.createReadStream(cssPath, "UTF-8");
              res.writeHead(200, {"Content-Type": "text/css"});
              fileStream.pipe(res);
            }
            */
      }
  });
  server.listen(8000);

        /*
        if(req.url.match("\.css$")){
          var cssPath = path.join(__dirname, 'public', req.url);
          console.log(cssPath);
          var fileStream = fs.createReadStream(cssPath, "UTF-8");
          res.writeHead(200, {"Content-Type": "text/css"});
          fileStream.pipe(res);
        }
        */