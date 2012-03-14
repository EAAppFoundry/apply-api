var express = require('express');
var api = require('./api');

var PositionProvider = require('./PositionsProvider').PositionProvider;
var PositionProvider = new PositionProvider();

var ApplicationProvider = require('./ApplicationProvider').ApplicationProvider;
var ApplicationProvider = new ApplicationProvider();

var app = module.exports = express.createServer();

// config shit
var pub = __dirname + '/public';

app.configure(function(){
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(express.static(pub));
	app.use(app.router);
});

// env config
app.configure('development', function(){
	app.use(express.errorHandler({ dumpExceptions: true, showStack: true}));
});

app.configure('production', function(){
	app.use(express.errorHandler());
});

//
//-------Routes go here ----

app.get('/', function(req, res) {
	res.send(api);
});

app.get('/jobs', function(req, res) {
	PositionProvider.getPositions(false, function(err, pos) {
		res.send(pos);
	});
});

app.get('/jobs/:id', function(req, res){
	PositionProvider.getPosition(req.params.id, function(err, position) {
		res.send(position);
	});
});

app.post('/jobs/apply', function(req, res){
	var rawdata = JSON.stringify(req.body);
	var type = req.body.type == 'designer' ? 'designer' : 'dev';

	Save(rawdata, type, function(err, status) {
		res.contentType('json');
		res.send({status : status});
	});
});

// ------end routes------


function Save(rawdata, type, callback) {
	var status;

	ApplicationProvider.saveApp(rawdata, type, function (err) {
		status = err === null ? 'ok' : 'failed';
		
		callback(err, status);
	});
}

var port = process.env.PORT || 3000;
if(!module.parent){
	app.listen(port);
	console.log("Express server listenting on port %d",app.address().port);
};