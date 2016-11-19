// Login
function login(req, res, next){
	if(req.session.user){
		console.log('You Have Logined !');
		return res.redirect('back'); //goto back page
	}
	next();
}

// Not Login
function noLogin(req, res, next){
	if(!req.session.user){
		console.log('Sorry, You Need Login !');
		return res.redirect('/login');//goto Login page
	}
	next();
}

exports.login = login;
exports.noLogin = noLogin;
