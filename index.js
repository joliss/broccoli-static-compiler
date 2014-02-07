var path = require('path')
var mkdirp = require('mkdirp')
var broccoli = require('broccoli')

module.exports = StaticCompiler
StaticCompiler.prototype = Object.create(broccoli.Transformer.prototype)
StaticCompiler.prototype.constructor = StaticCompiler
function StaticCompiler (inputTree, options) {
  if (!(this instanceof StaticCompiler)) return new StaticCompiler(inputTree, options)
  this.inputTree = inputTree
  this.options = options
}

StaticCompiler.prototype.transform = function (srcDir, destDir) {
  if (this.options.files == null) {
    broccoli.helpers.linkRecursivelySync(
      path.join(srcDir, this.options.srcDir),
      path.join(destDir, this.options.destDir))
  } else {
    var files = broccoli.helpers.multiGlob(this.options.files, {
      cwd: path.join(srcDir, this.options.srcDir)
    })
    for (var i = 0; i < files.length; i++) {
      mkdirp.sync(path.join(destDir, this.options.destDir, path.dirname(files[i])))
      broccoli.helpers.linkAndOverwrite(
        path.join(srcDir, this.options.srcDir, files[i]),
        path.join(destDir, this.options.destDir, files[i]))
    }
  }
  // This method is synchronous, so we don't need to return a promise here
}
