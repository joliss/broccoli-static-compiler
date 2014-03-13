var path = require('path')
var mkdirp = require('mkdirp')
var helpers = require('broccoli-kitchen-sink-helpers')
var Transform = require('broccoli-transform')

module.exports = StaticCompiler
StaticCompiler.prototype = Object.create(Transform.prototype)
StaticCompiler.prototype.constructor = StaticCompiler
function StaticCompiler (inputTree, options) {
  if (!(this instanceof StaticCompiler)) return new StaticCompiler(inputTree, options)
  this.inputTree = inputTree
  this.options = options
}

StaticCompiler.prototype.transform = function (srcDir, destDir) {
  if (this.options.files == null) {
    helpers.linkRecursivelySync(
      path.join(srcDir, this.options.srcDir),
      path.join(destDir, this.options.destDir))
  } else {
    var files = helpers.multiGlob(this.options.files, {
      cwd: path.join(srcDir, this.options.srcDir)
    })
    for (var i = 0; i < files.length; i++) {
      mkdirp.sync(path.join(destDir, this.options.destDir, path.dirname(files[i])))
      helpers.linkAndOverwrite(
        path.join(srcDir, this.options.srcDir, files[i]),
        path.join(destDir, this.options.destDir, files[i]))
    }
  }
  // This method is synchronous, so we don't need to return a promise here
}
