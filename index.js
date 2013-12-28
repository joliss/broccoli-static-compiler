module.exports = function (broccoli) {
  var path = require('path')
  var mkdirp = require('mkdirp')

  StaticCompiler.prototype = Object.create(broccoli.Compiler.prototype)
  StaticCompiler.prototype.constructor = StaticCompiler
  function StaticCompiler (options) {
    this.options = options
  }

  StaticCompiler.prototype.compile = function (srcDir, destDir, callback) {
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
    callback()
  }

  return StaticCompiler
}
