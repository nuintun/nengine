Nengine
==========

>A static node http/https server

>[![NPM Version][npm-image]][npm-url]
>[![Download Status][download-image]][npm-url]
>![Node Version][node-image]
>[![Dependencies][david-image]][david-url]

Getting started
==========

### Install

```shell
$ npm install nengine
```

*`Note: nengine require nengine-cli`*

### Introduction

if you have installed `nengine-cli` and `nengine`, you can run nengine by command:

```shell
$ nengine
```

and use:

```shell
$ nengine -h
```

for help.

you can config server by `nengine.json` under server root:
```yml
port:
  80
hostname:
  127.0.0.1
dir:
  allow
key:
  /key.pem
cert:
  /cert.pem
ignoreAccess:
  deny
ignore:
  - /nengine.yml
  - /node_modules(|/**/*)
maxAge:
  2592000
index:
  - index.htm
  - index.html
  - default.htm
  - default.html
etag:
  true
lastModified:
  true
error:
  404:
    /error/404.html
  default:
    /error/default.html
```

`port`: server port. `{Number}`

`hostname`: server hostname. `{String}`

`key`: https key. `{String}`

`cert`: https cert. `{String}`

`dir`: show directory, you can set "allow", "deny", "ignore". `{String}`

`ignoreAccess`: set how "ignore" are treated when encountered. `{String}`

  the default value is `'deny'`.

  - `'deny'` send a 403 for any request for ignore matched.
  - `'ignore'` pretend like the ignore matched does not exist and 404.

`ignore`: set dir and files ignore glob rules. `{Array|String}`

`maxAge`: set max-age, unit: seconds and also you can set like "2 days". `{Number|String}`

`index`: set default document. `{Array|String}`

`etag`: set etag. `{Boolean}`

`lastModified`: set lastModified. `{Boolean}`

`error`: set custom error page. `{Object}`

## License

[MIT](LICENSE)

[david-image]: http://img.shields.io/david/nuintun/nengine.svg?style=flat-square
[david-url]: https://david-dm.org/nuintun/nengine
[node-image]: http://img.shields.io/node/v/nengine.svg?style=flat-square
[npm-image]: http://img.shields.io/npm/v/nengine.svg?style=flat-square
[npm-url]: https://www.npmjs.org/package/nengine
[download-image]: http://img.shields.io/npm/dm/nengine.svg?style=flat-square
