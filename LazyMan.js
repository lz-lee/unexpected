// promise

class LazyMan1 {
    constructor(name) {
      this.name = name
      this._preSleepTime = 0
      this.sayName = this.sayName.bind(this)
      this.p = Promise.resolve().then(() => {
          console.log('do sayName')
        if (this._preSleepTime > 0) {
          return this.holdOn(this._preSleepTime)
        }
      }).then(this.sayName)
    }

    sayName() {
      console.log(`Hi! this is ${this.name}!`)
    }

    holdOn(time) {
      return new Promise(resolve => {
        setTimeout(() => {
          console.log(`Wake up after ${time} second`)
          resolve()
        }, time * 1000)
      })
    }

    sleep(time) {
      this.p = this.p.then(
        () => this.holdOn(time)
      )
      return this
    }

    eat(meal) {
      this.p = this.p.then(() => {
        console.log(`eat ${meal}`)
      })
      return this
    }

    sleepFirst(time) {
        console.log('do sleepFirst')
      this._preSleepTime = time
      return this
    }
}
  // promise + 队列

class LazyMan {
    constructor(name) {
      this.name = name
      this.sayName = this.sayName.bind(this)
      this.queue = [this.sayName]
      Promise.resolve().then(() => this.callByOrder(this.queue))
    }

    callByOrder(queue) {
      let sequence = Promise.resolve()
      this.queue.forEach(item => {
        sequence = sequence.then(item)
      })
    }

    sayName() {
      return new Promise((resolve) => {
        console.log(`Hi! this is ${this.name}!`)
        resolve()
      })
    }

    holdOn(time) {
      return () => new Promise(resolve => {
        setTimeout(() => {
          console.log(`Wake up after ${time} second`)
          resolve()
        }, time * 1000)
      })
    }

    sleep(time) {
      this.queue.push(this.holdOn(time))
      return this
    }

    eat(meal) {
      this.queue.push(() => {
        console.log(`eat ${meal}`)
      })
      return this
    }

    sleepFirst(time) {
      this.queue.unshift(this.holdOn(time))
      return this
    }
}
  // 纯 callback
class LazyMan2 {
    constructor(name) {
      this.name = name
      this.sayName = this.sayName.bind(this)
      this.next = this.next.bind(this)
      this.queue = [this.sayName]
      setTimeout(this.next, 0)
    }

    callByOrder(queue) {
      let sequence = Promise.resolve()
      this.queue.forEach(item => {
        sequence = sequence.then(item)
      })
    }

    next(){
        const currTask = this.queue.shift()
      currTask && currTask()
    }

    sayName() {
      console.log(`Hi! this is ${this.name}!`)
      this.next()
    }

    holdOn(time) {
      setTimeout(() => {
        console.log(`Wake up after ${time} second`)
        this.next()
      }, time * 1000)
    }

    sleep(time) {
      this.queue.push(this.holdOn(time))
      return this
    }

    eat(meal) {
      this.queue.push(() => {
        console.log(`eat ${meal}`)
        this.next()
      })
      return this
    }

    sleepFirst(time) {
      this.queue.unshift(this.holdOn(time))
      return this
    }
}

new LazyMan1('Hank').sleepFirst(5).eat('supper');
