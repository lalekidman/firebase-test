module.exports = (db) => {
  const app = require('express').Router()
  const lookup = db.collection('/lookup')
  const uuidv1 = require('uuid/v1');
  const asyncs = require('async')
  app.get('/', (req, res) => {
    lookup.get().then((docs) => {
      let subData = []
      docs.forEach(el => {
        let data = {}
        data[el.id] = el.data()
        subData.push(data)
      })
      res.status(200).send(JSON.stringify(subData, null, 2))
    }).catch(err => {
      res.status(500).send(err)
    })
  })
  return app
}