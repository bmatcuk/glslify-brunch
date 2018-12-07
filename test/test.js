var expect = require('chai').expect;
var Plugin = require('../');

describe('Plugin', function() {
  var plugin;

  beforeEach(function() {
    plugin = new Plugin();
  });

  it('should be an object', function() {
    expect(plugin).to.be.ok;
  });

  it('should have a #compile method', function() {
    expect(plugin.compile).to.be.an.instanceOf(Function);
  });

  it('should compile and produce a valid result', function(done) {
    var content =
      "void main() {" +
      "  gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);" +
      "}";
    var expected = "module.exports = \"#define GLSLIFY 1\\nvoid main() {  gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);}\";";

    plugin.compile(content, 'test.glsl', function(err, data) {
      expect(err).to.not.be.ok;
      expect(data).to.equal(expected);
      done();
    });
  });
});

