/**
 * nengine
 * https://nuintun.github.io/nengine
 *
 * Licensed under the MIT license
 * https://github.com/Nuintun/nengine/blob/master/LICENSE
 */

'use strict';

var base = __dirname;
var fs = require('fs');
var path = require('path');
var util = require('../lib/util');
var template = require('./template');

// set template config
template.config('base', base);
template.config('compress', true);

/**
 * render template
 * @param root
 * @param filepath
 * @param data
 * @returns {String|Function|*|exports}
 */
function render(root, filepath, data) {
  var relapath = '/' + path.relative(root, base).replace(/\\/g, '/');

  data = util.extend(true, {}, data);

  data.ROOT = relapath;

  return template(filepath, data);
}

/**
 * date format
 * @param date
 * @param format
 * @returns {XML|string|void}
 */
function dateFormat(date, format) {
  format = format || 'yyyy-MM-dd hh:mm:ss';

  var map = {
    'M': date.getMonth() + 1, //月份
    'd': date.getDate(), //日
    'h': date.getHours(), //小时
    'm': date.getMinutes(), //分
    's': date.getSeconds(), //秒
    'q': Math.floor((date.getMonth() + 3) / 3), //季度
    'S': date.getMilliseconds() //毫秒
  };

  format = format.replace(/([yMdhmsqS])+/g, function(all, t) {
    var v = map[t];

    if (v !== undefined) {
      if (all.length > 1) {
        v = '0' + v;
        v = v.substr(v.length - 2);
      }

      return v;
    } else if (t === 'y') {
      return (date.getFullYear() + '').substr(4 - all.length);
    }

    return all;
  });

  return format;
}

module.exports = function(root) {
  return {
    html: {
      dir: function(dirname, files, cwd) {
        var stats = [];

        files.forEach(function(file) {
          var stat;
          try {
            stat = fs.statSync(path.join(cwd, file));

            stats.push({
              name: file,
              type: stat.isDirectory() ? 'DIR' : 'FILE',
              mtime: dateFormat(stat.mtime)
            });
          } catch (e) {
            stats.push({
              name: file,
              type: 'UNKNOW',
              mtime: 'UNKNOW'
            });
          }
        });

        return render(root, '/html/dir', {
          files: stats,
          dirname: dirname
        });
      },
      error: function(status, message) {
        return render(root, '/html/error', {
          status: status,
          message: message
        });
      }
    },
    render: render
  };
};
