var logger = require('morgan'),
  cors = require('cors'),
  http = require('http'),
  express = require('express'),
  errorhandler = require('errorhandler'),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose'),
  morgan = require('morgan'),
  helmet = require('helmet'),
  config = require('./config.json');
 
mongoose.Promise = global.Promise;
mongoose.connect(config.database, {useMongoClient: true});
mongoose.connection.on('open', function () {
	var app = express();
	app.use(morgan('dev'));
	app.use(helmet());
	app.use(cors());
	 
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(bodyParser.json());
	
	app.use(require('./reports-routes'));
 
	app.listen(3002, function (err) {
		   console.log('Server is running at: ' + 'http://localhost:3002');
	});
});