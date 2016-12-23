/**
 * Created by מרדכי on 11 נובמבר 2016.
 */

var S3FS = require('../modules/s3fsImplementation');
var fs = require('fs');
var program = require('commander');

function createTree(amazonFolder, rootFolder, debug) {
	if (debug) console.log('Started running');

	S3FS.readdirp(amazonFolder)
	.then(function (directories) {
		if (debug) console.log('Got directories: ' + directories.toString());
		for (var i=0; i<directories.length; ++i) {
			if(directories[i].slice(-1) == '/') {
				var destinationAdress = rootFolder + '/' + directories[i];
				if (debug) console.log('-- Proccessing file: ' + directories[i] + ' -> ' + destinationAdress);
				fs.mkdirSync(destinationAdress);
			} else {
				if (debug) console.log('---- This file was not processed: ' + directories[i]);
			}
		}

		if (debug) console.log('End of processing');
	});

	if (debug) console.log('End of request');
}

program
	.version('1.0.0')
	.option('-o --output-dir <dir>', 'The directory to save the tree to', '.')
	.option('-i --input-dir <dir>', 'The amazon directory to start from', '5777')
	.option('-d --debug', 'Print debug information')
	.parse(process.argv)

var debug = program.debug;
var amazonFolder = program.inputDir;
var rootFolder = program.outputDir;

createTree(amazonFolder, rootFolder, debug)
