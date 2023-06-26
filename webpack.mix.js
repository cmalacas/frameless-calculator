const mix = require('laravel-mix');
const webpack = require("webpack");
/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js('src/index.js', 'dist/js').react()
   .js('src/frontend.js', 'dist/js').react()
   .sass('src/sass/app.scss', 'dist/css')
    .webpackConfig({
        plugins: [
            new webpack.ProvidePlugin({
                $: "jquery",
                jQuery: "jquery"
            }),
        ],        
    });