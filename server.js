const express = require('express');
const webpack = require('webpack');
const webpackDevServer = require('webpack-dev-server')
const path = require('path')


const app = express()

app.use(express.static(__dirname+'/client/dist'))
app.use(express.static('public'))

const port = process.env.PORT || 3000

app.listen(port)
