# IMDb Fetcher
## Fetches the 10 highest box office films with trailers and info
### Installable as a PWA

<img src="./images/desktop.png" height="300"/>
<img src="./images/mobile.png" height="300"/>

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
