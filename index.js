var express = require('express');
var app = express();
app.set('port', (5000));

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
  res.render('index.ejs');
});

app.listen(app.get('port'), function(){
    console.log("Test");
});