# broccoli-static-compiler

The `StaticCompiler` copies static files.

## Usage Example

```js
var StaticCompiler = require('broccoli-static-compiler')(broccoli);
compilerCollection.addCompiler(new StaticCompiler({
  srcDir: '/todomvc',
  files: ['**/*.png', '**/*.jpg'],
  destDir: '/assets'
}));
```

This would copy `/todomvc/icons/check-mark.png` to
`/assets/icons/check-mark.png`.

To copy files from more than one `srcDir`, register multiple instances of this
compiler.

## Options

### srcDir (required), destDir (required)

The `destDir` directory will be created, and all files and directories inside
of `srcDir` will be recursively copied into `destDir`.

### files (optional)

A list of glob patterns. If provided, instead of copying all files, only files
matched by any of the patterns will be copied. You must only specify files,
not directories, in this list.
