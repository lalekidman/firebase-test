'use strict'
const uuidv4 = require('uuid/v4')
class QueueGroup {
  constructor ({name = 'Q1', minCapacity = 1, maxCapacity = 4, counter = 0, prefix = 'A', id = ''}) {
    this.id = id || uuidv4()
    this.name = name
    this.minCapacity = minCapacity
    this.maxCapacity = maxCapacity
    this.counter = counter
    this.prefix = prefix
  }
}
module.exports = QueueGroup
