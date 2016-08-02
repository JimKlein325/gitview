# Band Tracker - O - Rama

#### JavaScript skill demonstration project:  Week 1 - August, 2016

#### By Jim Klein

## Description

Gitview is a sample application for demonstrating basic proficiency in Javascript, JQuery, and related build tools and creating simple web apps.

A user can enter a github user name and view the user's public repositories and their descriptions.

## Setup/Installation Requirements
* Install this project by cloning this repository:
    https://github.com/JimKlein325/gitview.git
* Run $ npm install and all packages saved to the manifest file package.json.
* Run $ bower install and all packages saved to the manifest file bower.json.
* Get you Personal Access Token from github using these instructions:  https://github.com/blog/1509-personal-api-tokens
* Create a file ".env" to hold an environment variable containing your github Personal Access Token.
* Declare the following variable to hold Personal Access Token in the .env file: exports.apiKey = "YOUR-TOKEN-HERE";
* In your project directory run:  $ gulp build
* In your project directory run:  $ gulp serve
* View the app in your browser at "localhost:3000"

## Technologies Used
* Node.js
* Node Package Manager to install tools from the command line for use in our project.
* Gulp, a JavaScript package, to run development tasks.
* Bower, a package manager like npm, optimized for frontend packages like Bootstrap and jQuery.
* AJAX, "Asynchronous JavaScript And XML" for making API calls to Github's Cross-Origin Resource Sharing (CORS) standard service.
* HTML, JavaScript, CSS, SCSS
* Bootstrap

### License
MIT License  Copyright (c) 2016 **Jim Klein**