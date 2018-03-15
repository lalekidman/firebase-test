module.exports = (db) => {
  const app = require('express').Router()
  const queueGroups = db.collection('/queueGroups')
  const uuidv4 = require('uuid/v4');
  const asyncs = require('async')
  const QG = require('../models/queue-group')
  app.post('/', (req, res) => {
    res.type('application/json')
    const data = req.body
    if (!data) {
      res.status(500).json({
        err: 'data field is required.'
      })
      return false
    }
    const queueGroupData = new QG(data)
    queueGroups.doc(uuidv4()).set(JSON.parse(JSON.stringify(queueGroupData))).then((docs) => {
      res.status(200).send(JSON.stringify(docs, null, 2))
    }).catch(err => {
      res.status(500).send(err)
    })
  })
  app.get('/', (req, res) => {
    res.type('application/json')
    const data = req.body
    if (!data) {
      res.status(500).json({
        err: 'data field is required.'
      })
      return false
    }
    const queueGroupData = new QG(data)
    queueGroups.get().then((docs) => {
      let subData = []
      docs.forEach(el => {
        subData.push({
          id: el.id,
          data: el.data()
        })
      });
      res.status(200).send(JSON.stringify(subData, null, 2))
    }).catch(err => {
      res.status(500).send(err)
    })
  })
  return app
}