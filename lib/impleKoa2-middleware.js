const http = require('http');

class Koa2 {
  middlewareList
  constructor() {
    this.middlewareList = [];
  }

  use(fn) {
    this.middlewareList.push(fn);
  };

  excute(ctx, middlewareList) {
    function next() {
      const fn = middlewareList.shift(); // fn => (ctx, next) => {}
      try {
        return Promise.resolve(
          fn(ctx, next)
        );
      } catch (err) {
        return Promise.reject(err);
      }
    }
    return next();
  }

  callBack() {
    return (req, res) => {
      const ctx = {
        req,
        res,
        query: req.query,
        method: req.method,
        url: req.url,
        body: res.body
      };
      return this.excute(ctx, this.middlewareList);
    }
  }

  listen(...args) {
    const server = http.createServer(this.callBack());
    server.listen(...args)
  }
}

module.exports = Koa2
