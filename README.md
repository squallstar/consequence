# Consequence

[![Circle CI](https://circleci.com/gh/squallstar/consequence.svg?style=svg)](https://circleci.com/gh/squallstar/consequence)

## Development

```
# Install deps
npm install

# Run everything
grunt
```

and then, just open http://localhost/

# Deployment

```
# Create the app
heroku create appname

# Set up Nodejs buildpack
heroku config:add BUILDPACK_URL=https://github.com/mbuchetics/heroku-buildpack-nodejs-grunt.git

# Push master branch to heroku app
git push heroku master

# Open the app
heroku open
```

Simple as that.