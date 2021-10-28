# Node: My First Node

## Getting Started

1. Open your command line and navigate to your repos directory (if you do not have a repos folder, then you can use mkdir repos to create one)
2. Use this template repository to start a new project in your repos folder: git clone <repo_name>
3. cd repo_name to navigate into your new repo directory
4. Start Visual Studio Code and select 'Open Folder'. Then select repo_name to open the folder in the editor (or just type code . in your terminal inside the repo directory)
5. Follow the instructions on the README.md file to complete exercises
6. Open the app.js file to get started

## Exercise

- Let’s use Node to write “Hello, World!” to a web page. Reference the Intro to Node.js notes, and place the following code snippets in the correct place

  - `http.createServer()`
  - `function(request, response) {}`
  - `response.writeHead()`
  - `response.end()`
  - `listen()`
  - `function(){console.log("Server listening...")}`

1. With the code in place, change the port from `8080` to `3000`
2. In your cmd prompt / terminal, navigate to the project directory
3. Once in the correct directory, run the following command: `node app.js`
4. Open your browser, and navigate to []("http:localhost:3000")