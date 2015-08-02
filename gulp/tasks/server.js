var gulp = require('gulp');
// var connect = require('gulp-connect');
var config = require('../config').server.settings;

// gulp.task('server', ['build', 'watch'], function(){
//     connect.server(config.settings);
// })

var path = require('path'),
    fs = require('fs'),
    gulp = require('gulp'),
    connect = require('gulp-connect'),
    gutil = require('gulp-util'),
    Freemarker = require('freemarker.js'),
    _ = require('underscore'),
    RouterMapping = require('../../routerMapping');

var rootPath = path.join(__dirname, '../../')
	basePath = config.root + '/views',
    fm = new Freemarker({
      viewRoot: path.join(rootPath, basePath),
      options: {}
    }),
    mockPath = './mock',
    ftlReg = /.*(ftl)$/g,
    jsonReg = /.*(json)$/g;

    console.log(path.join(rootPath, basePath))

function handleFtl(req, res, next){
  var router = _.findKey(RouterMapping, function(val, key){
    var keyReg = new RegExp('^' + key + '$', 'g');
    return keyReg.test(req.url) && ftlReg.test(val);
  });

  if(!ftlReg.test(req.url) && !router){
    next();
    return;
  }

    var tplPath = router ? RouterMapping[router] : req.url,
        _mockPath = mockPath + tplPath,
        __mockPath = _mockPath.slice(0, _mockPath.lastIndexOf('.')) + '.json',
        totalMockPath = path.join(rootPath, __mockPath),
        data = {};

    if(fs.existsSync(totalMockPath)){
      data = require(totalMockPath);
    }

    fm.render(tplPath, data, function(err, html, output){
        if(err){
            gutil.log('[server]:\n', err);
            next();
            return;
        }
        res.setHeader("Content-Type", "text/html;charset=utf-8");
        res.write(html);
        res.end();
  });
}

function handleJson(req, res, next){
  var router = _.findKey(RouterMapping, function(val, key){
    var keyReg = new RegExp('^' + key + '$', 'g');
    return keyReg.test(req.url) && jsonReg.test(val);
  });

  if(!jsonReg.test(req.url) && !router){
    next();
    return;
  }

  var jsonPath = router ? RouterMapping[router] : req.url;
  res.setHeader("Content-Type", "application/json;charset=utf-8");
  res.write(JSON.stringify(require(rootPath + jsonPath)));
  res.end();
}

gulp.task('server', ['watch'], function(callback){
  connect.server({
    root: path.join(rootPath, config.root),
    livereload: true,
    middleware: function(connect, opt){
      return [
        handleFtl,
        handleJson
      ];
    }
  });
});
