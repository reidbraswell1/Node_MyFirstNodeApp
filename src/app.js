console.log("Hello World!\n==========\n");

// Exercise 1 Section
console.log("EXERCISE 1:\n==========\n");

//const http = require("http");
import http from 'http';
import url from 'url';
import fs from 'fs';
import path from 'path';
import ejs from 'ejs';
import { SSL_OP_DONT_INSERT_EMPTY_FRAGMENTS } from 'constants';

// Create a local server to receive data from
const server = http.createServer((req, res) => {
  let htmlFile = '';
  let type = '';
  let urlToRoute = '';
  if(req.url.indexOf('?') == -1) {
    urlToRoute = req.url;
  }
  else {
    urlToRoute = (req.url).substring(0,req.url.indexOf("?"));
  }
  let postObject;
  let data = '';
  switch(urlToRoute) {
    case '/about':
      console.log(`--- Begin Case ${urlToRoute} ---`);
      homepage(req,res);
      /*
      console.log(`--- Begin Case ${urlToRoute} ---`);
      htmlFile = 'index.ejs'
      type = 'text/html';
      data = {title: 'test'};
      //render(res, req, htmlFile, type, data);
      */
      console.log(`--- End Case ${urlToRoute} ---`)
      break;
    case '/form-submission':
      console.log(`--- Begin Case ${urlToRoute} ---`);
      formSubmissionProcess(req, res);
      /*
      switch(req.method) {
        case "GET":
          console.log(`--- Begin Case ${req.method}`);
          console.log(queryObject);
          console.log(`Query Object Name = ${queryObject.name}`);
          console.log("\nMethod 2 URLSearchParms");
          let params = new URLSearchParams(req.url.substring(req.url.indexOf("?")));
          console.log(`GET URL Parameters = ${req.url.substring(req.url.indexOf("?"))}`)
          console.log(`GET URLSearchParams Parameters = ${params}`);
          console.log(`GET URLSearchParams.name = ${params.get("name")}\n`);
          console.log(`GET URLSearchParams.favorite-programming-language = ${params.get("favorite-programming-language")}\n`);
          console.log(`--- End Case ${req.method} ---`);
          break;
        case "POST":
          console.log(`--- Begin Case ${req.method}`);
          let body = '';
          // Errors
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
            //body = querystring.parse(body);
            postObject = new URLSearchParams(`?${body}`);
            console.log(`POST body = ${body}`);
            console.log(`POST Object = ${postObject}`);
            console.log(`POST URLSearchParams.name = ${postObject.get("name")}`);
            console.log(`POST URLSearchParams.favorite-programming-language = ${postObject.get("favorite-programming-language")}`);
            htmlFile = 'response.ejs';
            type = 'text/html';
            data = postObject;
            console.log(`post objecet before render = ${postObject}`);
            render(res,req,"response.ejs",'text/html',postObject);
          });
          console.log(`--- End Case ${req.method} ---`);
          break;
        }
        */

        console.log(`--- End Case ${urlToRoute} ---`);
        break;
      case '/styles/indexStyle.css':
        console.log(`--- Begin Case ${urlToRoute} ---`);
        /*
        htmlFile = 'indexStyle.css';
        type = 'text/css';
        */
        indexStyle(req,res);
        console.log(`--- End Case ${urlToRoute} ---`);
        break;
      case '/styles/responseStyle.css':
        console.log(`--- Begin Case ${urlToRoute} ---`);
        /*
        htmlFile = 'responseStyle.css';
        type = 'text/css';
        */
        responseStyle(req, res);
        console.log(`--- End Case ${urlToRoute} ---`);
        break;
      default:
        console.log(`--- Begin Case ${urlToRoute} ---`);
        //console.log(querystring.parse(req.url));
        oopsPage(req, res);
        /*
        htmlFile = 'oops.html';
        type = 'text/html';
        */
        console.log(`--- End Case ${urlToRoute} ---`);
        break;
  }

  if(htmlFile) {
    console.log(`if htmlFile entered`);
		render(res, req, htmlFile, type, data);
  }

  function render(res,req, htmlFile, type, data) {
    console.log(`--- Begin Function render() ${htmlFile}---`);
    switch (type) {
      // Serve a html file
      case 'text/html':
        console.log(`--- Begin Case ${type} ---`);
        fs.stat(`./views/${htmlFile}`, (err, stats) => {
          res.statusCode = 200;
          // Dont set content type if using ejs
          //res.setHeader('Content-Type', 'text/html');
          //console.log(err);
          if(stats) {
            const template = fs.readFileSync(`./views/${htmlFile}`,'utf-8');
            let renderedTemplate;
            //console.log(htmlFile);
            if(htmlFile == 'response.ejs') {
              renderedTemplate = ejs.render(template,{title:'Form Response',name:data.get("name"), favoriteProgrammingLanguage:data.get("favorite-programming-language")});
            }
            else {
              renderedTemplate = ejs.render(template,{title:"apple"});
            }
            //fs.createReadStream(`./views/${htmlFile}`).pipe(res);
            res.end(renderedTemplate);
          }
          else {
            res.statusCode = 404;
            res.end('<h1>Sorry, page not found!</h1>');
          }
          console.log(`--- End Case ${type} ---`);
        });
        break;
        // Serve a css file
      case 'text/css':
        console.log(`--- Begin Case ${type} ---`);
        let fileStream = fs.createReadStream(`./styles/${htmlFile}`, "utf-8");
        let css = fs.readFileSync(`./styles/${htmlFile}`, "utf-8");
        //console.log(fileStream);
        res.writeHead(200, {"Content-Type": "text/css"});
        res.end(css);
        //fileStream.pipe(res);
        console.log(`--- End Case ${type} ---`);
        break;
      } // Switch
        console.log(`---End Function render()---`);
    } // Render
  });
  server.listen(8000);
  console.log("Server running at http://localhost:8000/");

        /*
        if(req.url.match("\.css$")){
          var cssPath = path.join(__dirname, 'public', req.url);
          console.log(cssPath);
          var fileStream = fs.createReadStream(cssPath, "UTF-8");
          res.writeHead(200, {"Content-Type": "text/css"});
          fileStream.pipe(res);
        }
        */

function homepage(req, res, data) {
  console.log(`--- Begin Function homepage() ---`);
  const htmlPage = 'index.ejs';

  const template = fs.readFileSync(`./views/${htmlPage}`,'utf-8');
  const renderedTemplate = ejs.render(template,{title:"Homepage"});
  res.write(renderedTemplate);
  res.end();

  console.log(`--- End Function homepage() ---`);
}

function indexStyle(req, res) {
  console.log(`--- Begin Function indexStyle() ---`);
  const styleSheet = 'indexStyle.css';

  let fileStream = fs.createReadStream(`./styles/${styleSheet}`, "utf-8");
  let css = fs.readFileSync(`./styles/${styleSheet}`, "utf-8");
  res.writeHead(200, {"Content-Type": "text/css"});
  res.write(css);
  res.end();
  console.log(`--- End Function indexStyle() ---`);
}

function responseStyle(req, res) {
  console.log(`--- Begin Function indexStyle() ---`);
  const styleSheetDirectory = "./styles/";
  const styleSheet = 'responseStyle.css';

  let fileStream = fs.createReadStream(`${styleSheetDirectory}${styleSheet}`, "utf-8");
  let css = fs.readFileSync(`${styleSheetDirectory}${styleSheet}`, "utf-8");
  res.writeHead(200, {"Content-Type": "text/css"});
  res.write(css);
  res.end();
  console.log(`--- End Function indexStyle() ---`);
}

function formSubmissionProcess(req, res) {
  console.log(`--- Begin Function formSubmissionProcess() ---`);
  switch(req.method) {
    case "GET":
      console.log(`--- Begin Case ${req.method}`);
      console.log(queryObject);
      console.log(`Query Object Name = ${queryObject.name}`);
      console.log("\nMethod 2 URLSearchParms");
      let params = new URLSearchParams(req.url.substring(req.url.indexOf("?")));
      console.log(`GET URL Parameters = ${req.url.substring(req.url.indexOf("?"))}`)
      console.log(`GET URLSearchParams Parameters = ${params}`);
      console.log(`GET URLSearchParams.name = ${params.get("name")}\n`);
      console.log(`GET URLSearchParams.favorite-programming-language = ${params.get("favorite-programming-language")}\n`);
      console.log(`--- End Case ${req.method} ---`);
      break;
    case "POST":
      console.log(`--- Begin Case ${req.method}`);
      let body = '';
      // Errors
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
        //body = querystring.parse(body);
        let postObject = new URLSearchParams(`?${body}`);
        console.log(`POST body = ${body}`);
        console.log(`POST Object = ${postObject}`);
        console.log(`POST URLSearchParams.name = ${postObject.get("name")}`);
        console.log(`POST URLSearchParams.favorite-programming-language = ${postObject.get("favorite-programming-language")}`);
        console.log(`post objecet before render = ${postObject}`);
        responsePage(req, res, postObject);
        //render(res,req,"response.ejs",'text/html',postObject);
      });
  }
  console.log(`--- End Function formSubmissionProcess() ---`);
}

function responsePage(req, res, webPageData) {
  console.log(`--- Begin Function responsePage() ---`);
  const htmlPage = 'response.ejs';

  const template = fs.readFileSync(`./views/${htmlPage}`,'utf-8');
  let renderedTemplate = '';
  if(req.method == "GET") {
    renderedTemplate = ejs.render(template,{});
  }
  else if(req.method == "POST") {
    renderedTemplate = ejs.render(template,{ title:"Form Response", name:webPageData.get("name"), favoriteProgrammingLanguage:webPageData.get("favorite-programming-language") });
  }
  res.write(renderedTemplate);
  res.end();
  
  console.log(`--- End Function responsePage() ---`);
}

function oopsPage(req, res, webPageData) {
  console.log(`--- Begin Function responsePage() ---`);
  const htmlPage = 'oops.ejs';

  const template = fs.readFileSync(`./views/${htmlPage}`,'utf-8');
  const renderedTemplate = ejs.render(template,{ title:"Ivalid URL Page", url:req.url });

  res.write(renderedTemplate);
  res.end();
  
  console.log(`--- End Function responsePage() ---`);
}