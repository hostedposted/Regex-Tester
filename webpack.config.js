const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WorkboxWebpackPlugin = require("workbox-webpack-plugin");

module.exports = {
    mode: "production",
    plugins: [
            new HtmlWebpackPlugin({template: "template/index.html", filename: "../index.html", minify: false}),
            new WorkboxWebpackPlugin.GenerateSW({swDest: "sw.js", clientsClaim: true, skipWaiting: false})
    ],
    performance: {
        hints: false
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"],
                        plugins: ["@babel/plugin-transform-runtime"]
                    }
                },
                exclude: /node_modules/
            },
            {
                test: /.(sa|sc|c)ss$/,
                use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            },
            {
                test: /\.(jpg|jpeg|png|woff|woff2|eot|ttf|svg)$/,
                exclude: /node_modules/,
                use: 
                    [
                        {
                            loader: "url-loader",
                            options: {
                                limit: 10000
                            }
                        }
                    ]
            }
        ]
    },
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist")
    }
};
