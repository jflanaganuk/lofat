const outputDiv = document.querySelector('.output');

const url = new URL(`https://localhost/outputs/boxOffice10.json`, 'http://localhost');
fetch(url)
    .then(res => res.json())
    .then((data) => {
        if (outputDiv) {
            outputDiv.innerHTML = JSON.stringify(data)
        }
    })
    .catch(e => console.error(e))
