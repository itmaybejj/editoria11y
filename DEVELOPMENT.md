# Setup
* Run `scripts/get.sh` to pull and patch Sa11y library files and install node dependencies.
* git config core.hooksPath scripts/hooks
* Run NPM scripts as needed:
  * `npm run watch` compiles and watches JS and CSS folders for changes.
  * `npm run build` compiles once.
  * `npm run lint` lints
  * `npm run test` runs nightwatch tests. 
    * Note that the ChromeDriver dependency needs to be updated with almost every version of Chrome and may be out of date in the repo.
    * Note the first test after a computer reboot often times out. Run it twice before assuming ChromeDriver is the problem.

# Distribution

* Update version numbers and copyright information
* remember there is a copy of the readme at index.md (with CSS)

