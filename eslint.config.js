// eslint.config.js
const { defineConfig } = require("eslint/config");

module.exports = defineConfig([
	{
		ignores: ["/sa11y-lang/**,/sa11y-js/**, dist/", "*.json", "/package.json", "/bookmarklet/**", "/docs/**", "/dist/**"],
	}
]);
