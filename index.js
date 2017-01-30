var express = require('express');
var app = express();
app.set('port', (process.env.PORT || 6000));

app.get('/', function(request, response) {
  response.render('www/index');
});


app.listen(app.get('port'), function(){
    console.log("Test");
});