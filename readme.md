# IMDb Fetcher
## Fetches the 10 highest box office films with trailers and info
### Installable as a PWA
<a href="https://www.uploadr.co.uk/imdbfetch/" target="_blank" rel="noopener">
Click for a live example!
</a>
<br>
<br>

<img src="./images/desktop.png" height="200"/>
<img src="./images/mobile.png" height="200"/>

### Current Lighthouse Scores (mobile - incognito)

<img src="./images/currentScore.png" height="200"/>

## Development steps

### Start IMDB Fetcher

1. Copy `env.json.example` to `env.json`
2. Add your api key to `env.json`
3. For first time use, run `npm install`
4. For subsequent use, run `npm run fetch`
5. Files then are written to `public/outputs/` once per day (you may need to create this folder)

### Serve html files

6. Html and client side js is stored inside `public`

### React Development

7. Copy the current `.json` (from step 5) files into `src/stubs`
8. Run `npm run watch` to start local development
