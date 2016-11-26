#!/usr/bin/env node

/**
 * Created by zengohm on 16-11-25.
 */

var dir = require('./lib/dir');
var path = require('path');
var child_process = require('child_process');
var r = require('./lib/r');
var argv = require('optimist')
    .usage('Build requirejs project.\nUsage: $0')
    .string('s')
    .demand('s')
    .alias('s','src')
    .describe('s', 'project source dir')
    .string('d')
    .demand('d')
    .alias('d','dist')
    .describe('d', 'project build dir')
    .string('i')
    .alias('i','ignore')
    .describe('i', 'ignore module to package into file, split by |, eg: jquery|bootstrap')
    .argv;



var input = {
    app_root: argv.src,
    dist_root: argv.dist,
    ignore: (function(){
        var output = {};
        (argv.ignore || '').split('|').forEach(function(file){
           output[file] = 'empty:';
        });
        return output;
    })()
};

child_process.exec("rm -rf " + input.dist_root);
child_process.exec("cp -rf "+input.app_root + ' ' + input.dist_root);

var files = [].concat(
    dir.expand(input.app_root + '/**/*.js'),
    dir.expand(input.app_root + '/**/*.css')
);
files.forEach(function (file) {
    console.log(file);
    var filename = path.relative(input.app_root, file);
    var extend_name = path.extname(filename);
    switch (extend_name)
    {
        case '.js':
            r.build({
                    paths: input.ignore,
                    baseUrl: input.app_root,
                    name: filename.substr(0, filename.length-extend_name.length),
                    out: path.resolve(input.dist_root, filename)
                },
                function (error, stdout) {
                    //console.log(stdout);
                }
            );
            break;
        case '.css':
            r.build({
                    baseUrl: input.app_root,
                    cssIn: file,
                    out: path.resolve(input.dist_root, filename)
                },
                function (error, stdout) {
                    //console.log(stdout);
                }
            );
            break;
        default:
            break;
    }

});


