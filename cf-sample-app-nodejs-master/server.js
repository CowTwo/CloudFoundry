var express = require( 'express')
var app = express()
var cf_app = require( './app/vcap_application')
var cf_svc = require( './app/vcap_services')
var querystring = require("querystring");

app.set( 'views', __dirname + '/views')
app.set( 'view engine', 'jade')
app.use( express.static( __dirname + '/public'))

app.get( '/', function ( req, res) {
  res.render( 'pages/index', {
    app_environment:    app.settings.env,
    application_name:   cf_app.get_app_name(),
    app_uris:           cf_app.get_app_uris(),
    app_space_name:     cf_app.get_app_space(),
    app_index:          cf_app.get_app_index(),
    app_mem_limits:     cf_app.get_app_mem_limits(),
    app_disk_limits:    cf_app.get_app_disk_limits(),
    service_label:      cf_svc.get_service_label(),
    service_name:       cf_svc.get_service_name(),
    service_plan:       cf_svc.get_service_plan()
  })
})

app.get( '/JsTest', function ( req, res) {
  var body = '<html>'+
    '<head>'+
    '<meta http-equiv="Content-Type" content="text/html; '+
    'charset=UTF-8" />'+
    '</head>'+
    '<body>'+
    '<form action="/JsUpload" method="post">'+
    '<textarea name="text" rows="20" cols="60"></textarea>'+
    '<input type="submit" value="Submit text" />'+
    '</form>'+
    '</body>'+
    '</html>';

    res.writeHead(200, {"Content-Type": "text/html"});
    res.write(body);
    res.end();
})


app.post('/JsUpload', function(req, res) {
  var postData = "";

  req.setEncoding("utf8");

  req.addListener("data", function(postDataChunk) {
    postData += postDataChunk;
  });

  req.addListener("end", function() {
    res.writeHead(200, {"Content-Type": "text/plain"});
    res.write("You've sent the text: "+
    querystring.parse(postData).text);
    res.end();

  });
  
});

app.listen( process.env.PORT || 4000)
