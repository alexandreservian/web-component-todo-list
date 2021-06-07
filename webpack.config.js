const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
	entry: "./src/index.ts",
	module: {
		rules: [
			{
				test: /\.ts$/,
				include: [__dirname + "/src"],
				use: "ts-loader",
			},
		],
	},
	resolve: {
		modules: [__dirname + "/src", __dirname + "/node_modules"],
		extensions: [".ts", ".js"],
	},
	devtool: "eval-source-map",
	output: {
		filename: "bundle.js",
		path: __dirname + "/public",
	},
	plugins: [
		new HtmlWebpackPlugin({
			filename: "index.html",
			template: "src/index.html",
		}),
	],
	devServer: {
		proxy: {
			"/api": "http://localhost:8080",
		},
	},
};
