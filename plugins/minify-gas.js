'use strict';

function MinifyGas() {
}

function minify(source) {
  var comment_reg = /\/\*.*?\*\/|\/\/.*/g;
  var tab_reg = /\t/g;
  var space_reg = /(\n)\s+/g;
  var new_line_reg = /\n{2,}/g;
  // BUG: some semicolons still outputed
  var semicolon_reg = /(\}|\]|\));(\n|$)/g;

  var tmp_source = source.replace(comment_reg, '')
  .replace(tab_reg, '')
  .replace(space_reg, '$1')
  .replace(new_line_reg, '')
  .replace(semicolon_reg, '$1$2');
  return tmp_source
}

MinifyGas.prototype.apply = function (compiler) {
  var emit = function (compilation, callback) {
    compilation.chunks.forEach(function (chunk) {
      chunk.files.forEach(function (filename) {
        var source = compilation.assets[filename].source();
        var entries = minify(source);
        compilation.assets[filename] = {
          source: function () {
            return entries;
          },
          size: function () {
            return entries.length;
          }
        }
      });
    });
    callback();
  }

  if (compiler.hooks) {
    var plugin = { name: 'MinifyGas' }
    compiler.hooks.emit.tapAsync(plugin, emit);
  } else {
    compiler.plugin('emit', emit);
  }
};

module.exports = MinifyGas;