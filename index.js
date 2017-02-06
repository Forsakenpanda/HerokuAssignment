/**
 * Created by Nick Gregorio, 100514374
 * Created for Cloud Computing (UOIT)
 */
var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var app = express();
app.set('port', (process.env.PORT || 5000));

app.use(bodyParser.json({limit: '50mb'}));
app.use(express.static(__dirname + '/public'));

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');


//Setup SQL
var connection = mysql.createPool({
	host: 'us-cdbr-iron-east-04.cleardb.net',
	user: 'b8631a900f601f',
	password: '0220f825',
	database:'heroku_03065dfaf589cd4'
});

//Home page
app.get('/', function(req,res){
	res.render('index');
});

//Registration page
app.post('/register', function(req, res){
	connection.query('INSERT INTO users SET ?', req.body, function(err, data){
		if (err){
			console.error(err);				
			res.status(500).send("Some error with server");
    	} else {
			res.status(200).send("Successfully registered");
    	}
	});
})

//Login page
app.get('/login', function(req, res){
	var stringQuery = "SELECT * FROM users WHERE username='" + req.query.user + "' AND password='" + req.query.pass +"'";
  	connection.query(stringQuery, function(err, data){
    	if(err){
      		console.error(err);
      		res.status(500).send("Some error with server");
    	} else {
			console.log(data);
      		res.json(data);
    	}
  	})
})

//Rant submission page
app.post('/submitRant', function(req, res){
	console.log(req.body);
	connection.query('INSERT INTO posts SET ?', req.body, function(err, data){
		if(err){
			console.error(err);
			res.status(500).send("Some error sending rant");
		}else{
			res.status(200).send("Successfully submitted");
		}
	})
})

//Live feed
app.get('/getFeed', function(req, res){
	connection.query("SELECT * FROM posts", function (err,data){
		if(err){
			console.error(err);
			res.status(500).send("Failed getting news feed");
		} else{
			console.log(data);
			res.json(data);
		}
	})
})


app.listen(app.get('port'));