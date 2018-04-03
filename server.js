const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, 'client/dist')));
app.use(express.static('public'));

const port = process.env.PORT || 3000;

app.listen(port);
