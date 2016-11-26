Require Fast Build
--------------------

## Usage

```
/usr/bin/nodejs ./requirejs-build.js

Options:
  -s, --src     project source dir                                                    [required]
  -d, --dist    project build dir                                                     [required]
  -i, --ignore  ignore module to package into file, split by |, eg: jquery|bootstrap
```

#### Example
```
$ node requirejs-build.js -s example/app -d example/dist -i jquery
example/app/require.config.js
example/app/scripts/index.js
example/app/scripts/lib/loader.js
example/app/styles/index.css
```