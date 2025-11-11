#!/bin/bash

# Format JS, build .min file and run tests

npx eslint ./js/** --fix
./node_modules/.bin/css-minify -d ./css -o ./dist
# npx nightwatch tests --workers=4 --env=chrome
