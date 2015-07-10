# glslify-brunch
Run glsl files through [glslify](https://github.com/stackgl/glslify) in [brunch](http://brunch.io/).

## Installation
Install the plugin via npm with `npm install --save glslify-brunch`

Or manually:

* Add `"glslify-brunch": "x.y.z"` to `package.json` and run `npm install`
* If you want to use the git version, add: `"glslify-brunch": "git+ssh://git@github.com:bmatcuk/glslify-brunch.git"`

## Configuration
In your `brunch-config.coffee`, you can add glslify transform options:

```coffee
exports.config =
  ...
  plugins:
    glslify:
      transform: ...
```

Transform options are passed unmolested straight into glslify, so see the [glslify documentation](https://github.com/stackgl/glslify#source-transforms) for the format of the options.

You can also configure how glslify-brunch converts your GLSL into javascript. The default depends on your `modules.wrapper` setting in your `brunch-config.coffee` file:

* If `modules.wrapper = 'commonjs'` (the default brunch setting), the output will be:

  ```javascript
  module.exports = "...glsl...";
  ```
* If `modules.wrapper = 'amd'`, the output will be:

  ```javascript
  define([], function() {
    return "...glsl...";
  });
  ```
* Otherwise, the output will be:

  ```javascript
  <base filename>Glsl = "...glsl...";
  ```

  Where `<base filename>` of `/path/to/file.ext` would be `file`.

If you'd like to change this behavior, you can set the `wrapper` option:

```coffee
exports.config =
  ...
  plugins:
    glslify:
      wrapper: function(path, data) { return "...whatever..."; }
```

Make sure to `JSON.stringify(data)`
