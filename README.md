Require Build
--------------------

## Install
```
npm install -g requirejs-build
```

## Usage

```
requirejs-build -s APP_ROOT -d DIST_ROOT [-i IGNORE]

Options:
  -s, --src     project source dir                                                    [required]
  -d, --dist    project build dir                                                     [required]
  -i, --ignore  ignore module to package into file, split by |, eg: jquery|bootstrap
```

#### Example
```
$ requirejs-build -s example/app -d example/dist -i jquery
example/app/require.config.js
example/app/scripts/index.js
example/app/scripts/lib/loader.js
example/app/styles/index.css
```