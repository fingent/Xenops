#!/usr/bin/env node
var mkdirp = require('mkdirp');
var path = require('path');
var ncp = require('ncp').ncp;
ncp.limit = 16;


if (process.argv[2]) {
	
	var appdir = process.argv[2];
	// Folder structure created here.(make an copy of the application structure created here)
	mkdirp(path.resolve(process.cwd(), appdir), function(err){
		if (err)
			console.log(err);
		else {
			// Copy all the files from lib folder 
			var source = path.resolve(__dirname, '../lib');
			var dest =  path.resolve(process.cwd(), appdir);
			ncp(source, dest, function (err) {
				if (err) {
					return console.error(err);
				}
				console.log('Xenops sample Framework structure created in '+ appdir+'.');
			});
		}
	});

} else {
	console.log("Please provide the app name. Usage - xenops [dirname] eg: xenops myapp .");
}
