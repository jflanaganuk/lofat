import fs from 'fs';
import fetch from 'node-fetch';
import { BoxOffice, BoxOfficeItem, EnvType, Title, Trailer } from '../types';

const env: EnvType = require('../env.json');
const { key } = env;

setInterval(() => {
    fetchData()
}, 1000 * 60 * 60 * 24); // Run once a day

const fetchData = () => {
    const url = new URL(
        `https://imdb-api.com/en/API/BoxOffice/${key}`,
        'http://localhost'
    )
    fetch(url)
        .then(res => res.json())
        .then((data: BoxOffice) => {
            if (data.items.length) {
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

function writeFile(data, filename) {
    const formatted = JSON.stringify(data);
    fs.writeFile(`public/outputs/${filename}.json`, formatted, e => {
        if (e) return console.error(e);
        console.log(`Wrote ${filename} to file`)
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
        `https://imdb-api.com/en/API/Trailer/${key}/${id}`,
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
