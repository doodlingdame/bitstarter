#!usr/bin/env node

var fs= require('fs');
var cheerio = require('cheerio');
var commander = require('commander');
var HTMLFILE_DEFAULT = "index.html";	
var CHECKSFILE_DEFAULT = "checks.json";


var assertFileExists = function(inFile)
{
	var filename = inFile.toString();
	if(!fs.existsSync(filename))
	{
		console.log("%s does not exist. Exiting now". filename);
		process.exit(1);
	}
	return instr;
};

var cheerioHtmlFile = function(htmlfile)
{
 	return cheerio.load(fs.readFileSync(htmlfile));
};

var loadChecks = function(checksfile)
{
	return JSON.parse(fs.readFileSync(checksfile));
};

var checkHtmlFile = function(htmlfile, checksfile)
{
	$ = cheerioHtmlFile(htmlfile);
	var checks = loadChecks(checksfile);
	
	var out = {};
	
	for (var i in checks)
	{
		var present = $(checks[i]).length >0;
		out[checks[i]]=present;
	}
	
	return out;
}

var clone = function(fn) 
{
    return fn.bind({});
};


if(require.main == module)
{
	program
		.option('--c, --checks <check_file>', 'Path to checks.json', clone(assertFileExists), CHECKSFILE_DEFAULT);
		.option('--f, --file <html_file>', 'Path to index.html', clone(assertFileExists),HTMLFILE_DEFAULT);
		.parse(process.argv);

	var checkJson = checkHtmlFile(program.file, program.checks);
	var outJson = JSON.stringify(checkJson, null, 4);
	console.log(outJson);
}
else
{
	exports.checkHtmlFile = checkHtmlFile;
}





