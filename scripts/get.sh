#!/bin/bash

# This is a simple script to pull down the specified Sa11y branch from github
GIT_REF="dev-4.4.0"
mkdir -p tmp/
cd tmp/
git clone git@github.com:ryersondmp/sa11y.git .
git checkout $GIT_REF
rm -rf ../sa11y
mv src/js ../sa11y
cp ../js-overrides/logic/find-shadow-components.js ../sa11y/logic/find-shadow-components.js
cp ../js-overrides/rulesets/headers.js ../sa11y/rulesets/headers.js
cp ../js-overrides/utils/elements.js ../sa11y/utils/elements.js
cd ../
rm -rf tmp

npm install

# MacOS creates unwanted backup files
# rm editoria11y.libraries.yml-E
