module.exports = (db) => {
  const app = require('express').Router()
  const people = db.collection('/people')
  const uuidv1 = require('uuid/v1');
  const asyncs = require('async')
  app.get('/', (req, res) => {
    people.get().then((docs) => {
      let allPeople = []
      let subData = []
      docs.forEach(el => {
        allPeople.push({
          id: el.id,
          data: el.data()
        })
      })
      // res.status(200).send(JSON.stringify(subData, null, 2))
      res.status(200).send(JSON.stringify(allPeople, null, 2))
    }).catch(err => {
      res.status(500).send(err)
    })
  })
  app.get('/lale', (req, res) => {
      db.collection('people/lale/newTest').get().then((docs) => {
      let subData = []
      console.log('exist : ', docs.exist)
      console.log('exist : ', docs.exists)
      if (docs) {
        docs.forEach(el => {
          subData.push({
            id: el.id,
            data: el.data()
          })
        })
        res.status(200).send(JSON.stringify(subData, null, 2))
      } else {
        res.status(500).send(JSON.stringify({
          err: 'no data found'
        }, null, 2))
      }
      // res.status(200).send(JSON.stringify({id: docs.id, data: docs.data()}, null, 2))
    }).catch(err => {
      res.status(500).send(err)
    })
  })
  app.post('/', (req, res) => {
    res.type('application/json')
    const data = req.body
    let result = {
      err: null,
      data: []
    }
    people.doc('lale').collection('newTest').doc(uuidv1()).set(data).catch(err => {
      result.err = err.message
      return []
    }).then(data => {
      result.data = data
      res.status(200).send(JSON.stringify(result, null, 2))
    })
  })
  return app
}