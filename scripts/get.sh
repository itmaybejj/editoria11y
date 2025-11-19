#!/bin/bash

# This is a simple script to pull down the specified Sa11y branch from github
GIT_REF="dev-4.4.0"
mkdir -p tmp/
cd tmp/
git clone git@github.com:ryersondmp/sa11y.git .
git checkout $GIT_REF
rm -rf ../sa11y
mv src/js ../sa11y

# Patches
# Don't inject Sa11y CSS into shadow components
cp ../js-overrides/logic/find-shadow-components.js ../sa11y/logic/find-shadow-components.js
# Don't instantiate the Sa11y readability panel.
cp ../js-overrides/rulesets/readability.js ../sa11y/rulesets/readability.js
# Don't import any APCA nonCommercial licensed code.
cp ../js-overrides/utils/contrast-utils.js ../sa11y/utils/contrast-utils.js

cd ../
rm -rf tmp

npm install

# MacOS creates unwanted backup files
# rm editoria11y.libraries.yml-E
