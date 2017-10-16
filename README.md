 [![Build Status](https://travis-ci.org/gbengaPS/PostIT-Gbenga.svg?branch=dev)](https://travis-ci.org/gbengaPS/postit) [![Code Climate](https://codeclimate.com/github/gbengaPS/PostIT-Gbenga/badges/gpa.svg)](https://codeclimate.com/github/gbengaPS/postit) [![Coverage Status](https://coveralls.io/repos/github/gbengaPS/PostIT-Gbenga/badge.svg?branch=dev)](https://coveralls.io/github/gbengaPS/postit?branch=dev)

# PostIt
PostIt is a group messaging application that allows registered users communicate prioritized messages
with one another. Messages are prioritized in the following order: 
* Normal
* Urgent
* Critical

## Installation
To get Postit up and running on your local machine, you'll need to have the following installed:
* [Node](https://nodejs.org/) : This is powers the backend of the application
* [Postgres](https://www.postgresql.org/) : This is the database used
* [Git](https://expressjs.com/) (optional but highly recommended): Version control system <br /><br />
Once you have all of these installed, run this command `  git clone https://github.com/gbengaPS/postit.git  ` in your terminal<br /><br />
This will create a postit folder on your local machine<br /><br />
Change directory to postit `  cd postit  `<br /><br />
And then run  `  npm install  ` <br /><br />
This will install all dependencies.<br /><br />
You'll need to create a .env file, follow the pattern in the .env.example file. <br /><br />
Install sequelize cli globally `  npm install -g sequlize  ` and then run migrations `  sequelize db:migrate   `<br /><br />
To start the project, run `  npm start  `<br /><br />
This will start the server on port: 3000 <br /><br />

## Running the tests

To run tests, type the following in your terminal:
```
npm run test
```
## Want to Contribute ?
  * Fork the repository
  * Make your contributions
  * Ensure you have good git workflow
  * Create Pull request.

## Built With

* [Node](https://nodejs.org/) (Server)
* [Express Js](https://expressjs.com/) (Server side javascript framework)
* [React](https://reactjs.org/) frontend framework 
* [Postgres Databse](https://www.postgresql.org/) Database engine

## Author

* **Gbenga Oyetade** - *Initial work* - (https://github.com/gbengaPS)

## Acknowledgments

* Andela Fellowship (https://andela.com/)


