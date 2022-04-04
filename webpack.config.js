const path=require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports={
    mode:"development",
    entry:{
        app:"./src/app.tsx"
    },
    output:{
        path:path.resolve(__dirname,'./dist')
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:"./public/index.html"
        })
    ],
    resolve:{
        extensions: ['.ts', '.tsx', '.js'],
    },
    module:{
        rules:[
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: 'ts-loader',
                    },
                ],
            },
        ]
    }
}