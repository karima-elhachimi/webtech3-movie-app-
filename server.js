//{title: 'The Godfather', actors: ['Al Pacino', 'Marlon Brando', 'Robert Duvall']}

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;

const URL = 'mongodb://localhost:27017/';
let db;

app.listen(3000, () => {
    console.log('listening on 3000');
});


MongoClient.connect(URL, function(err, client) {
    if (err) return console.log(err);
    db = client.db('mydb');// whatever your database name is



});

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/', function (req, res) {
    res.render('add.ejs');
});

app.get('/list', (req, res) => {

    db.collection('movies').find().toArray((err, result) => {
        if (err) return console.log(err);
        // renders index.ejs
        res.render('list.ejs', {movies: result})
    })
});

app.post('/add', (req, res) => {

    let movie = {
        name: req.body.name,
        actors: req.body.actors.str.split(',')
    };

    db.collection('movies').save(movie, (err, result) => {
        if (err) return console.log(err);

        console.log('saved to database');
        res.redirect('/')
    });
});
