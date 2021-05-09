import express from 'express';
const app = express();

app.use('/public', express.static(__dirname + '/public'));
app.use('/imdbfetch', express.static(__dirname + '/'));
app.use('/imdbfetch/movie', express.static(__dirname + '/'));
app.use('/imdbfetch/tv', express.static(__dirname + '/'));
app.use('/imdbfetch/actor', express.static(__dirname + '/'));
app.use('/imdbfetch/*', express.static(__dirname + '/index.html'));
app.use('/', express.static(__dirname + '/'));

app.get('/', (_req, res) => {
    res.sendFile(`${__dirname}/index.html`)
})

app.listen(3000, () => {
    console.log("====-====[Listening on port 3000]====-====");
    setTimeout(() => {
        console.log("Visit the site at : http://localhost:3000/imdbfetch")
    }, 5000);
})