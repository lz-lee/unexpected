const http = require('http');
const slice = Array.prototype.slice;

class LikeExpress {
  routes;

  constructor() {
    this.routes = {
      all: [],
      get: [],
      post: [],
    };
  }

  registry(path) {
    const routeInfo = {};
    if (typeof path === 'string') {
      routeInfo.path = path;
      routeInfo.stack = slice.call(arguments, 1);
    } else {
      routeInfo.path = '/';
      routeInfo.stack = slice.call(arguments, 0);
    }
    return routeInfo;
  }

  use() {
    const routeInfo = this.registry.apply(this, arguments);
    this.routes.all.push(routeInfo);
  }

  get() {
    const routeInfo = this.registry.apply(this, arguments);
    this.routes.get.push(routeInfo);
  }

  post() {
    const routeInfo = this.registry.apply(this, arguments);
    this.routes.post.push(routeInfo);
  }

  match(method, url) {
    let cbList = [];
    if (url === '/favicon.ico') {
      return cbList;
    }
    const currentRoute = [...this.routes.all, ...this.routes[method]];

    currentRoute.forEach(routeInfo => {
      if (url.indexOf(routeInfo) === 0) {
        cbList = cbList.concat(routeInfo.stack);
      }
    });
    return cbList;
  }

  excute(req, res, cbList) {
    const next = () => {
      const cb = cbList.shift();
      if (cb) {
        cb(req, res, next);
      }
    }
    next();
  }

  callBack() {
    return (req, res) => {
      res.json = (data) => {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(data))
      }
      const url = req.url;
      const method = req.method.toLowerCase();
      const cbList = this.match(method, url);
      this.excute(req, res, cbList);
    }
  }

  listen(port, cb) {
    const server = http.createServer(this.callBack());
    server.listen(port, cb);
  }
}

module.exports = () => {
  return new LikeExpress();
}