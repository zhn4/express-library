# express-library

> About
Express.js + mongodb 搭建的图书馆，学习用

## 操作

安装数据库后，工程需要安装 mongoose 依赖

```bash
npm install mongoose
```

接下来，需要注入数据，数据可在 [这里](https://developer.mozilla.org/zh-CN/docs/Learn_web_development/Extensions/Server-side/Express_Nodejs/mongoose)下载，放在工程根目录下

按照先后顺序执行一下命令，一定要顺序执行，不然的话会报 mongoose 的错误

```bash
npm install async
```

```bash
node populatedb <mongodb url>
```

### ❌错误示范

清空了旧数据，重新注入数据直接执行命令。无论如何都报错。只能按照官网的步骤操作才重新注入数据

```bash
D:\express>node populatedb "mongodb://localhost:27017/admin"         
This script populates some test books, authors, genres and bookinstances to your database. Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.cojoign.mongodb.net/local_library?retryWrites=true&w=majority&appName=Cluster0"
node:internal/modules/cjs/loader:1424
  throw err;
  ^

Error: Cannot find module 'mongoose'
Require stack:
- D:\express\models\book.js
- D:\express\populatedb.js
    at Module._resolveFilename (node:internal/modules/cjs/loader:1421:15)
    at defaultResolveImpl (node:internal/modules/cjs/loader:1059:19)
    at resolveForCJSWithHooks (node:internal/modules/cjs/loader:1064:22)
    at Module._load (node:internal/modules/cjs/loader:1227:37)
    at TracingChannel.traceSync (node:diagnostics_channel:328:14)
    at wrapModuleLoad (node:internal/modules/cjs/loader:245:24)
    at Module.require (node:internal/modules/cjs/loader:1504:12)
    at require (node:internal/modules/helpers:152:16)
    at Object.<anonymous> (D:\express\models\book.js:1:18)
    at Module._compile (node:internal/modules/cjs/loader:1761:14) {
  code: 'MODULE_NOT_FOUND',
  requireStack: [ 'D:\\express\\models\\book.js', 'D:\\express\\populatedb.js' ]
}

Node.js v24.13.0
```

### 成功示范

先安装 async 依赖，再执行注入数据脚本

```bash
D:\express>npm install async
npm warn Unknown user config "sass_binary_site". This will stop working in the next major version of npm.
npm warn Unknown user config "disturl". This will stop working in the next major version of npm.
npm warn Unknown user config "chromedriver-cdnurl". This will stop working in the next major version of npm.
npm warn Unknown user config "couchbase-binary-host-mirror". This will stop working in the next major version of npm.
npm warn Unknown user config "debug-binary-host-mirror". This will stop working in the next major version of npm.
npm warn Unknown user config "electron-mirror". This will stop working in the next major version of npm.
npm warn Unknown user config "flow-bin-binary-host-mirror". This will stop working in the next major version of npm.
npm warn Unknown user config "fse-binary-host-mirror". This will stop working in the next major version of npm.
npm warn Unknown user config "fuse-bindings-binary-host-mirror". This will stop working in the next major version of npm.
npm warn Unknown user config "git4win-mirror". This will stop working in the next major version of npm.
npm warn Unknown user config "gl-binary-host-mirror". This will stop working in the next major version of npm.
npm warn Unknown user config "grpc-node-binary-host-mirror". This will stop working in the next major version of npm.
npm warn Unknown user config "hackrf-binary-host-mirror". This will stop working in the next major version of npm.
npm warn Unknown user config "leveldown-binary-host-mirror". This will stop working in the next major version of npm.
npm warn Unknown user config "leveldown-hyper-binary-host-mirror". This will stop working in the next major version of npm.
npm warn Unknown user config "mknod-binary-host-mirror". This will stop working in the next major version of npm.
npm warn Unknown user config "node-sqlite3-binary-host-mirror". This will stop working in the next major version of npm.
npm warn Unknown user config "node-tk5-binary-host-mirror". This will stop working in the next major version of npm.
npm warn Unknown user config "nodegit-binary-host-mirror". This will stop working in the next major version of npm.
npm warn Unknown user config "operadriver-cdnurl". This will stop working in the next major version of npm.
npm warn Unknown user config "phantomjs-cdnurl". This will stop working in the next major version of npm.
npm warn Unknown user config "profiler-binary-host-mirror". This will stop working in the next major version of npm.
npm warn Unknown user config "puppeteer-download-host". This will stop working in the next major version of npm.
npm warn Unknown user config "python-mirror". This will stop working in the next major version of npm.
npm warn Unknown user config "rabin-binary-host-mirror". This will stop working in the next major version of npm.
npm warn Unknown user config "sass-binary-site". This will stop working in the next major version of npm.
npm warn Unknown user config "sodium-prebuilt-binary-host-mirror". This will stop working in the next major version of npm.
npm warn Unknown user config "sqlite3-binary-site". This will stop working in the next major version of npm.
npm warn Unknown user config "utf-8-validate-binary-host-mirror". This will stop working in the next major version of npm.
npm warn Unknown user config "utp-native-binary-host-mirror". This will stop working in the next major version of npm.
npm warn Unknown user config "zmq-prebuilt-binary-host-mirror". This will stop working in the next major version of npm.
npm warn deprecated core-js@2.6.12: core-js@<3.23.3 is no longer maintained and not recommended for usage due to the number of issues. Because of the V8 engine whims, feature detection in old core-js versions could cause a slowdown up to 100x even if nothing is polyfilled. Some versions have web compatibility issues. Please, upgrade your dependencies to the 
actual version of core-js.

added 184 packages, and audited 185 packages in 27s

15 packages are looking for funding
  run `npm fund` for details

14 vulnerabilities (7 low, 2 moderate, 5 high)

To address issues that do not require attention, run:
  npm audit fix

To address all issues, run:
  npm audit fix --force

Run `npm audit` for details.

D:\express>node populatedb "mongodb://localhost:27017/admin"         
This script populates some test books, authors, genres and bookinstances to your database. Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.cojoign.mongodb.net/local_library?retryWrites=true&w=majority&appName=Cluster0"
Debug: About to connect
Debug: Should be connected?
Adding genres
Added genre: Science Fiction
Added genre: Fantasy
Added genre: French Poetry
Adding authors
Added author: Isaac Asimov
Added author: Jim Jones
Added author: Patrick Rothfuss
Added author: Bob Billings
Added author: Ben Bova
Adding Books
Added book: The Wise Man's Fear (The Kingkiller Chronicle, #2)
Added book: Test Book 1
Added book: Death Wave
Added book: Test Book 2
Added book: The Name of the Wind (The Kingkiller Chronicle, #1)
Added book: Apes and Angels
Added book: The Slow Regard of Silent Things (Kingkiller Chronicle)
Adding authors
Added bookinstance: New York Tom Doherty Associates, 2016.
Added bookinstance:  Gollancz, 2015.
Added bookinstance: New York Tom Doherty Associates, 2016.
Added bookinstance: New York Tom Doherty Associates, 2016.
Added bookinstance: New York, NY Tom Doherty Associates, LLC, 2015.
Added bookinstance:  Gollancz, 2011.
Added bookinstance: London Gollancz, 2014.
Added bookinstance: Imprint XXX2
Added bookinstance: Imprint XXX3
Added bookinstance: New York, NY Tom Doherty Associates, LLC, 2015.
Added bookinstance: New York, NY Tom Doherty Associates, LLC, 2015.
Debug: Closing mongoose
```

## 参考教程

> <https://developer.mozilla.org/zh-CN/docs/Learn_web_development/Extensions/Server-side/Express_Nodejs/Displaying_data>
