const path = require('path');
const express = require('express');

const app = express();

app.use(express.static(path.resolve(__dirname, 'client/dist')));
app.use('*', express.static(path.resolve(__dirname, 'client/dist')));

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`App started on port ${port}`));
