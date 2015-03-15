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
heroku config:set BUILDPACK_URL=https://github.com/heroku/heroku-buildpack-nodejs

# Push master branch to heroku app
git push heroku master

# Open the app
heroku open
```

Simple as that.

# Structure

## Endpoints

### 1. Auth

```
GET /login/twitter
GET /login/twtter/callback
GET /logout
```

### 2. Socket

```
POST /session
```

## Tables

### 1. Users

```
id
full_name
username
twitter_oauth_key
twitter_oauth_secret
```

## Socket structure

Notes:

- Save player status (e.g. location) to DB whenever a socket disconnects, and every minute of activity.
- Disconnect multiple sessions of the same user
- Read room JSON/YAML files on startup. If YAML, try http://nodeca.github.io/js-yaml/

### On connect

Player data on socket:

```
position = area_id
last_request = null
last_response = null
```

Send player instructions if in starting area.

### Example conversation

```
SERVER
- open socket
- setup player last position
- give player instructions (like a tutorial, just ask)
- emit "message": { "description": "You are in the middle of a wooden forest." }

CLIENT
- emit "message": "look around"

SERVER
- emit "message": { "description": "There is a small house on the left" }

CLIENT
- emit "message": "enter house"

SERVER
- emit "message": { "description" : "You are inside a house. There are some keys on the ground, and a bottle of water" }

CLIENT
- emit "message": "exit"

SERVER
- emit "message": { "description" : "You are in front of the building" }

```
