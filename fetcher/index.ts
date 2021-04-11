import fs from 'fs';
import fetch from 'node-fetch';
import { BoxOffice, BoxOfficeItem, EnvType, Title, Trailer } from '../types';

const env: EnvType = require('../env.json');
const { key } = env;

setInterval(() => {
    fetchData()
}, 1000 * 60 * 60 * 24 * 7); // Run once a week

const fetchData = () => {
    const url = new URL(
        `https://imdb-api.com/en/API/BoxOffice/${key}`,
        'http://localhost'
    )
    fetch(url)
        .then(res => res.json())
        .then((data: BoxOffice) => {
            if (data.items.length) {
                moveOldFile('boxOffice10');
                writeFile(data, 'boxOffice10');
                data.items.map(item => {
                    fetchFilm(item)
                })
            } else {
                console.error('Error with returned data:', data)
            }
        })
        .catch(e => console.error(e))
}

function moveOldFile(filename) {
    fs.rename(`public/outputs/${filename}.json`, `public/outputs/${filename}old.json`, e => {
        if (!e) {
            console.log(`renamed ${filename} to ${filename}old`);
            return;
        }
        console.error(e);
    });
}

function writeFile(data, filename) {
    const formatted = JSON.stringify(data);
    const date = new Date();
    fs.writeFile(`public/outputs/${filename}.json`, formatted, e => {
        if (e) return console.error(e);
        console.log(`Wrote ${filename} to file at ${date.toLocaleDateString()}`)
    })
}

const fetchFilm = (item: BoxOfficeItem) => {
    const url = new URL(
        `https://imdb-api.com/en/API/Title/${key}/${item.id}`,
        'http://localhost'
    )
    fetch(url)
        .then(res => res.json())
        .then((data: Title) => {
            if (data.errorMessage === "") {
                writeFile(data, item.id);
                fetchTrailer(item.id);
            } else {
                console.error('Error with returned data:', data, data.errorMessage)
            }
        })
}

const fetchTrailer = (id: string) => {
    const url = new URL(
        `https://imdb-api.com/en/API/YouTubeTrailer/${key}/${id}`,
        'https://localhost'
    )
    fetch(url)
        .then(res => res.json())
        .then((data: Trailer) => {
            if (data.errorMessage === "") {
                writeFile(data, `${id}trailer`)
            } else {
                console.error('Error with returned data:', data, data.errorMessage)
            }
        })
}

fetchData();
