const path = require('path');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        chunkFilename: '[id].js',
        publicPath: ''
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: {
                     "presets": ["@babel/preset-env", "@babel/preset-react"] 

                }
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: [
                    { loader: 'style-loader' },
                    { 
                        loader: 'css-loader',
                        options: {
                            modules: {
                                localIdentName: "[name]__[local]___[hash:base64:5]",
                            },														
                            sourceMap: true
                        }
                     },
                     { 
                         loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [
                                    [ 'autoprefixer', {}, ],
                                ],
                            },
                        }
                      }
                ]
            },
           
                {
                  test: /\.(png|jpg|gif|svg)$/i,
                  use: [
                    {
                      loader: 'url-loader',
                      options: {
                        mimetype: false,
                      },
                    },
                  ],
                },
                {
                    test: /\.(png|svg|jpg|jpeg|gif|ico)$/,
                    exclude: /node_modules/,
                    use: ['file-loader?name=[name].[ext]'] // ?name=[name].[ext] is only necessary to preserve the original file name
                  }
              
           
        ],
        
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: __dirname + '/public/index.html',
            filename: 'index.html'
        })
    ]
};