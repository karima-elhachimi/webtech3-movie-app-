//{title: 'The Godfather', actors: ['Al Pacino', 'Marlon Brando', 'Robert Duvall']}

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;

const URL = 'mongodb://localhost:27017/';
let db;



MongoClient.connect(URL, function(err, client) {
    if (err) return console.log(err);
    db = client.db('mydb');// whatever your database name is
    app.listen(4000, () => {
        console.log('listening on 4000');
    });



});

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/', function (request, response) {
    // do something here
});

app.post('/search/:movie', (req, res) => {
    console.log('Hellooooooooooooooooo!');
});

app.post('/add', (req, res) => {

});
