//server for Steam Web API How-To project
//Erik Bowers
//2016
var key = 0;//Steam API key goes here

var express = require('express');
var application = express();
var handlebars = require('express-handlebars').create({defaultLayout: 'main' });
var request = require('request');
var bodyParser = require('body-parser');
application.use(bodyParser.json());//the default for Steam is json data, so we'll parse it as such
application.set('port', 3000);

//header information that allows the whole communication to happen
//From http://52.40.59.238/code.html and https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS#Access-Control-Allow-Origin
application.use(function(req, res, next){
	//specifies the origin of the site making requests
	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');//URL needs to match URL linked with Steam API key 
	//specifies what methods are allowed in the request
	res.setHeader('Access-Control-Allow-Methods', 'GET');
	//specifies what header type of headers can be used
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
	//Deals with cookies, false since we aren't using cookies.
	//commented out since I don't think I need it for Steam API, but I might
	//res.setHeader('Access-Control-Allow-Credentials', false);
	next();
}/*end function*/);//end application.use

application.get('/', function(req, res){
var URL = 'http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=' + key + '&steamids=76561197960435530';
		request.get(URL, function(error, sRes, body){
		res.setHeader('Content-Type', 'application/json');
		console.log(body);
		res.send(body);
		//How to use res.render pulled from: http://expressjs.com/en/api.html#res.render
		res.render('home.handlebars', function(err, bodyData){});//end res.render 
	}/*end inner function)*/);//end request.get
}/*end outer function*/);//end application.get

//listening on the port we selected up top
application.listen(application.get('port'), function(){
	console.log('Express started on port:' + application.get('port') + ' press Ctrl-C to quit.');
}/*end function*/);//end application.listen
