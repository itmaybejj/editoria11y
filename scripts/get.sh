#!/bin/bash

# This is a simple script to pull down the specified Sa11y branch from github
GIT_REF="4.4.0"
mkdir -p tmp/
cd tmp/
git clone git@github.com:ryersondmp/sa11y.git .
git checkout $GIT_REF
rm -rf ../src/sa11y
mv src/js ../src/sa11y

# Patches
# Don't inject Sa11y CSS into shadow components
cp ../src/sa11y-patch/logic/find-shadow-components.js ../src/sa11y/logic/find-shadow-components.js

cd ../
rm -rf tmp

# Get library version number.
filename="src/js/version.js"
regex=".*(version = '3)(.*)(';)";
while IFS= read -r line; do
  if [[ "$line" =~ $regex ]]; then
    ED11YV=${BASH_REMATCH[2]}
  	fi
done < "$filename"
sed -i -E "s/.*\(* @version 3\)\(.*\)/  \1${ED11YV}/g" rollup.config.js

npm install

# MacOS creates unwanted backup files
# rm editoria11y.libraries.yml-E
