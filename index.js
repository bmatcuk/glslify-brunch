var glslify = require('glslify'),
    path = require('path');

function GlslifyCompiler(config) {
  if (config == null) config = {};
  var plugin = config.plugins && config.plugins.glslify;
  var modules = config.modules
  this.transform = plugin && plugin.transform;
  this.wrapper = plugin && plugin.wrapper;
  if (!this.wrapper) {
    var wrapper = modules && modules.wrapper || 'commonjs';
    if (wrapper == 'commonjs')
      this.wrapper = function(filename, data) { return 'module.exports = ' + JSON.stringify(data) + ';'; };
    else if (wrapper == 'amd')
      this.wrapper = function(filename, data) { return 'define([], function() { return ' + JSON.stringify(data) + '; });'; };
    else
      this.wrapper = function(filename, data) { return path.parse(filename).name.replace(/^[^A-Za-z]+/, '').replace(/[^A-Za-z0-9_]/g, '') + 'Glsl = ' + JSON.stringify(data) + ';'; };
  }
}

GlslifyCompiler.prototype.brunchPlugin = true;
GlslifyCompiler.prototype.type = 'javascript';
GlslifyCompiler.prototype.extension = 'glsl';
GlslifyCompiler.prototype.compile = function(data, filename, callback) {
  var options = {basedir: path.dirname(filename)};
  if (this.transform)
    options.transform = this.transform;
  try {
    var src = glslify.compile(data, options);
    callback(null, this.wrapper(filename, src));
  } catch (err) {
    callback(err);
  }
};

module.exports = GlslifyCompiler;

