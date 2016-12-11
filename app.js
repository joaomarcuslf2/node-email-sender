var nodemailer = require("nodemailer");
var fs = require('fs-extra');
var auth = fs.readJsonSync('auth.conf.json');
var email = fs.readJsonSync('email.conf.json');

var smtpTransport = nodemailer.createTransport("SMTP",{
	service: "Gmail",  // sets automatically host, port and connection security settings
	auth: {
		user: auth.user,
		pass: auth.pass
	}
});

smtpTransport.sendMail({  //email options
		from: auth.user,
		to: email.to,
		subject: email.subject,
		text: email.text,
	}, 
	function(error, response){  //callback
		if(error){
		console.log(error);
		}else{
		console.log("Message sent: " + response.message);
	}

	smtpTransport.close(); // shut down the connection pool, no more messages.  Comment this line out to continue sending emails.
});
