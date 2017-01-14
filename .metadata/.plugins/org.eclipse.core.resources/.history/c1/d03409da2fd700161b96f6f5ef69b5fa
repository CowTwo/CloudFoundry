

exports.send_form = function(req, res){
	res.render('testform', { title: 'TestForm' });
}; 

exports.process_post = function(req, res){
    console.log(req.body.title);
    console.log(req.body.description);
    res.send("Got Info: title="+req.body.title+", description="+req.body.description);
};