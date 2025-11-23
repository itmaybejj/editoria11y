// eslint.config.js
const { defineConfig } = require("eslint/config");

module.exports = defineConfig([
	{
		ignores: ["/sa11y/**, dist/", "*.json", "/package.json", "/bookmarklet/**", "/docs/**", "/dist/**"],
	}
]);
