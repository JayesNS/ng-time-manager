const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const path = require('path');

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: 'false' }));
app.use(express.static(path.join(__dirname, '../dist/ng-life-assistant')));
app.use('/', express.static(path.join(__dirname, '../dist/ng-life-assistant')));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('Server running at ' + port);
});
