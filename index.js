var express = require('express');
var app = express();
app.set('port', (process.env.PORT || 6000));

// views is directory for all template files
app.set('www', __dirname + '/www');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('index');
});


app.listen(app.get('port'), function(){
    console.log("Test");
});