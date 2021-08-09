# Reels

## To Run:

- Navigate to http://reels-movie-app.herokuapp.com/
- Or open index.html using your local file path, or using Live Server. Because script.js is now being served from Heroku, there's no need to run the local express server.
- Optionally: `heorku local` serves the app locally on your machine.

## Development:

- If modifying SCSS files, run `npm run watch` in the command line before working, this will compile the SCSS into CSS in the proper `public` folder. (don't use the VS Code GUI "Watch Sass" for file structure reasons).

## Heroku Deployment

_This section assumes you have the heroku CLI installed._

1. Start your work session with `heroku login` in the command line. This will re-direct you to the browser for credentials, then return to your IDE.
2. `git remote -v` will show you if your project is pointing to the proper heroku remote, which is `https://git.heroku.com/reels-movie-app.git` (and the `...danil0man/mynder.git` address should also be listed as 'origin'.
3. after making changes to the code and commiting, use both `git push` (to push to github) and `git push heroku main` (to push to heroku). This may take a moment, and will build and deploy the app.
