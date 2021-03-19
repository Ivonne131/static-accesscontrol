const express = require('express');
const routes = require('./routes');
const { users } = require('./data')
const dotenv = require('dotenv');
dotenv.config();


const app = express();

const port = process.env.PORT;

app.use( (req, res, next) => {
    //Como si se hubiera iniciado sesión con token y ese show
    res.locals.loggedInUser = users.find(user => user.id === 3)
    next();
  });

  //Utiliza routes.js
app.use('/', routes);

app.listen(port, () => {
  console.log('Server is listening on Port:', port)
})