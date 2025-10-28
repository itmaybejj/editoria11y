#!/bin/bash

# Format JS, build .min file and run tests

npx eslint ./js --fix
css-minify -d ./css -o ./dist
#sass --style=compressed css/editoria11y.css dist/editoria11y.min.css
npx nightwatch tests --workers=4 --env=chrome
