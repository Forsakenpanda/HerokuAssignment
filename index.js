var express = require('express');
var app = express();
app.set('port', (process.env.PORT || 5000));

app.listen(app.get('port'));

app.get('/', function(res,req){
    console.log('Node app is running on port', app.get('port'));
});