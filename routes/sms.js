module.exports = (db) => {
  const app = require('express').Router()
  const people = db.collection('/people')
  const uuidv1 = require('uuid/v1');
  const asyncs = require('async')
  app.post('/', (req, res) => {
    
  })
  return app
}