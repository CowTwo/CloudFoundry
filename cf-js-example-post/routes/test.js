

exports.send_form = function(req, res){
	res.render('testform', { title: 'TestForm' });
}; 

exports.process_post = function(req, res, Issue){
	var issueInfo = req.body; //Get the parsed information
    if(!issueInfo.title || !issueInfo.description){
        res.send("Sorry, you provided worng info!");
    }
    else{	
        var newIssue = new Issue({ 
            title: issueInfo.title,
            description: issueInfo.description
        });
        newIssue.save(function(err, res_db){
            if(err){
                res.send("TestDB Error /!");
            }
            else{
                res.send("TestDB OK /!");
            }
        });
		
    }	
};

exports.process_query = function(req, res, Issue){
    Issue.find(function(err, res_db){
        res.json(res_db);
    });	
};