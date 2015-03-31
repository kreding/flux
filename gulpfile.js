/**
 * 构建工程
 * @type {[type]}
 */
var requireDir = require('require-dir');

// Require all tasks in gulp/tasks, including subfolders
requireDir('./gulp/tasks', { recurse: true });
