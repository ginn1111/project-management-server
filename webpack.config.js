const webpack = require("webpack");
const dotenv = require("dotenv");
const nodeExternals = require("webpack-node-externals");
const path = require("path");
const LodashModuleReplacementPlugin = require("lodash-webpack-plugin");
const BundleAnalyzerPlugin =
	require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const CopyWebpackPlugin = require("copy-webpack-plugin");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

const config = {
	entry: path.resolve(__dirname, "src", "index.ts"),
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "[name].js",
	},
	target: "node",
	mode: "production",
	externals: [nodeExternals()], // fix resolve externals module
	module: {
		rules: [
			{
				test: /\.ts(x)?$/,
				loader: "ts-loader",
				exclude: /node_modules/,
			},
		],
	},
	resolve: {
		extensions: [".tsx", ".ts", ".js"],
	},
	plugins: [
		new webpack.DefinePlugin({
			"process.env": JSON.stringify(
				dotenv.config({ path: "./.env.production" }).parsed,
			),
		}),

		new LodashModuleReplacementPlugin(),
		new CopyWebpackPlugin({
			patterns: [
				{
					from: "./prisma/schema.prisma",
					to: path.resolve(__dirname, "dist/", "prisma/schema.prisma"),
				},
			],
		}),
		new NodePolyfillPlugin(), // add core polyfill module of nodejs - removed from webpack5
		new BundleAnalyzerPlugin({
			analyzerMode: "static",
			openAnalyzer: false,
		}),
	],
	optimization: {
		runtimeChunk: "single",
	},
	cache: false,
};

module.exports = config;
