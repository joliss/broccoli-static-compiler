# broccoli-static-compiler

Pluck files out of a tree, optionally copying them to another tree.

(The package name is for historical reasons. We might change it when we hit
1.0.)

## Installation

```bash
npm install --save-dev broccoli-static-compiler
```

## Usage Example

Given a file structure like:

```shell
.
└── todomvc
    ├── css
    │   └── todos.css
    └── icons
        ├── check-mark.png
        └── logo.jpg
```

You can use `broccoli-static-compiler` to copy files

```javascript
var pluckFiles = require('broccoli-static-compiler');
var sourceTree = '.'; // use the current working directory as the source tree

var imageFilesTree = pluckFiles(sourceTree, {
  srcDir: '/todomvc',
  files: ['**/*.png', '**/*.jpg'],
  destDir: '/assets'
});
```

This would copy `./todomvc/icons/check-mark.png` and
`./todomvc/icons/logo.jpg` to
`./assets/icons/check-mark.png` and
`./assets/icons/logo.jpg`, but not copy `./todomvc/css/todos.css`:

```shell
.
├── assets
│   └── icons
│       ├── check-mark.png
│       └── logo.jpg
└── todomvc
    ├── css
    │   └── todos.css
    └── icons
        ├── check-mark.png
        └── logo.jpg
```


## Options

### srcDir (optional, defaults to `'/'`)
All files and directories inside of `srcDir` will be recursively copied into `destDir`

Beginning file tree:

```shell
.
└── todomvc
    ├── css
    │   └── todos.css
    └── icons
        ├── check-mark.png
        └── logo.jpg
```

Filter:

```javascript
var pluckFiles = require('broccoli-static-compiler');
var sourceTree = '.'; // use the current working directory as the source tree

var staticFiles = pluckFiles(sourceTree, {
  srcDir: '/todomvc',
  destDir: '/assets'
});
```

Resulting File tree:

```shell
.
├── assets
│   ├── css
│   │   └── todos.css
│   └── icons
│       ├── check-mark.png
│       └── logo.jpg
└── todomvc
    ├── css
    │   └── todos.css
    └── icons
        ├── check-mark.png
        └── logo.jpg
```

### destDir (optional, defaults to `'/'`)
All files and directories inside of `srcDir` will be recursively copied into `destDir`.

Beginning file tree:

```shell
.
└── todomvc
    ├── css
    │   └── todos.css
    └── icons
        ├── check-mark.png
        └── logo.jpg
```

Filter:

```javascript
var pluckFiles = require('broccoli-static-compiler');
var sourceTree = '.'; // use the current working directory as the source tree

var staticFiles = pluckFiles(sourceTree, {
  srcDir: '/todomvc',
  destDir: '/build'
});
```

Resulting File tree, where all files from `./todomvc` have been recursively
copied to `'./build':

```shell
.
├── build
│   ├── css
│   │   └── todos.css
│   └── icons
│       ├── check-mark.png
│       └── logo.jpg
└── todomvc
    ├── css
    │   └── todos.css
    └── icons
        ├── check-mark.png
        └── logo.jpg
```


If `destDir` is omitted, it will default to `'/'`. Files will not be copied
from `srcDir` but references to those files will be part of the resulting tree object
and can be passed to other Broccoli filters:

Beginning file tree:

```shell
.
└── todomvc
    ├── css
    │   └── todos.css
    └── icons
        ├── check-mark.png
        └── logo.jpg
```

Filter:

```javascript
var pluckFiles = require('broccoli-static-compiler');
var sourceTree = '.'; // use the current working directory as the source tree

var staticFiles = pluckFiles(sourceTree, {
  srcDir: '/todomvc',
});
```

In the file system, no changes have occurred, but you can think of
the value of `staticFiles` as being equal to the following tree:

```shell
.
└── todomvc
    ├── css
    │   └── todos.css
    └── icons
        ├── check-mark.png
        └── logo.jpg
```

This tree can be passed to other Broccoli filters for additional manipulation.

### files (optional)

A list of glob patterns. If provided, instead of copying all files, only files
matched by any of the patterns will be copied and part of hte resulting tree.
You must only specify files, not directories, in this list.
