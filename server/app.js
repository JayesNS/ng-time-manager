const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const path = require('path');
const mongoose = require('mongoose');
const config = require('./config/database');
const cors = require('cors');
const User = require('./models/user');

mongoose.Promise = require('bluebird');
mongoose
  .connect(config.database, { promiseLibrary: require('bluebird'), useNewUrlParser: true })
  .then(() => console.log('connection successful'))
  .catch(err => console.error(err));

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: 'false' }));

const apiRoutes = require('./routes/api');
app.use('/api', apiRoutes);
app.use('/', express.static(path.join(__dirname, '../dist/ng-life-assistant')));
app.use('/*', express.static(path.join(__dirname, '../dist/ng-life-assistant')));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('Server running at ' + port);
});
