var express = require('express');
var app = express();
app.listen(5001);

app.get('/', function(res,req){
    res.send("Hello World");
});