# mynder

## to run:

- npm run start
- Open index.html using your local file path, or using Live Server (the default port that Liver Server uses is okay, even though npm will say 'listening on port 5001')

## Heroku deployment

_This section assumes you have the heroku CLI installed._

1. Start your work session with `heroku login` in the command line. This will re-direct you to the browser for credentials, then return to your IDE.
2. `git remote -v` will show you if your project is pointing to the proper heroku remote, which is `https://git.heroku.com/reels-movie-app.git` (and the `...danil0man/mynder.git` address should also be listed as 'origin'.
3. after making changes to the code and commiting, use both `git push` (to push to github) and `git push heroku main` (to push to heroku).
