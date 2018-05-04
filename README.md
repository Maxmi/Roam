# Roam

## Summary
My implementation of [Roam module of Learners Guild curriculum](https://curriculum.learnersguild.org/Phases/Practice/Modules/Roam/).  
A full-stack web application for travelers where:
 - each user has a profile page,
 - users can view information on different cities,
 - users can leave reviews for those cities,
 - can edit or delete their reviews  

## What I learned doing this project:

## Built with:

* [Node.js](https://nodejs.org/)
* [Express](https://expressjs.com/)
* [PostgreSQL](https://www.postgresql.org/)
* [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
* [Pug](https://pugjs.org/)
* [Bootstrap](https://getbootstrap.com/docs/4.0/getting-started/introduction/)

## Deployed Site
  https://roam-by-mira.herokuapp.com/

## Getting Started

These instructions are for getting a copy of the project on your local environment.

* Clone/Fork - `git clone https://github.com/Maxmi/Roam.git`
* Install npm packages - `npm install`

## Setting up your database

* Create database and tables - `npm run db:init` (make sure you don't have a db named `roam` as this command will delete it)

## Setting up your config

* Run `cp .env.template .env` command in the terminal to create your own `.env` file and enter your config values in the `.env` file

## Starting your development server

* Run `npm start`
* To access the app go to `http://localhost:3000`

## Running tests  
* Run `npm test`
